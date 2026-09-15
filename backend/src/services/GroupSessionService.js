/**
 * Group Session Service
 *
 * Webinars and group discussions. The two differ in intent — a webinar is
 * one-to-many and a GD needs a minimum panel before it runs — but they share
 * registration, Razorpay checkout and the video room, so both live here.
 *
 * Video uses Agora, the same stack as 1-on-1 sessions, rather than a second
 * vendor for the same capability.
 */

import { prisma } from '../config/database.js';
import { razorpayInstance } from '../config/razorpay.js';
import crypto from 'crypto';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const slugify = (title) =>
  String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60) || 'webinar';

const VISIBLE_WEBINAR_STATUSES = ['PUBLISHED', 'LIVE'];
const ACTIVE_REGISTRATION_STATUSES = ['CONFIRMED', 'ATTENDED'];

const mapWebinar = (webinar, { userId } = {}) => {
  const confirmed = (webinar.registrations || []).filter((r) =>
    ACTIVE_REGISTRATION_STATUSES.includes(r.status)
  );

  return {
    id: webinar.id,
    slug: webinar.slug,
    title: webinar.title,
    description: webinar.description,
    coverImageUrl: webinar.coverImageUrl,
    startsAt: webinar.startsAt,
    endsAt: webinar.endsAt,
    isPaid: webinar.isPaid,
    price: webinar.price,
    capacity: webinar.capacity,
    status: webinar.status,
    roomId: webinar.roomId,
    hostName: webinar.hostMentorProfile?.user?.name ?? null,
    hostPicture: webinar.hostMentorProfile?.user?.profilePicture ?? null,
    registeredCount: confirmed.length,
    seatsLeft: webinar.capacity ? Math.max(0, webinar.capacity - confirmed.length) : null,
    isRegistered: userId ? confirmed.some((r) => r.userId === userId) : false,
    createdAt: webinar.createdAt,
  };
};

const mapDiscussion = (gd, { userId } = {}) => {
  const confirmed = (gd.registrations || []).filter((r) =>
    ACTIVE_REGISTRATION_STATUSES.includes(r.status)
  );

  return {
    id: gd.id,
    topic: gd.topic,
    description: gd.description,
    startsAt: gd.startsAt,
    endsAt: gd.endsAt,
    minParticipants: gd.minParticipants,
    maxParticipants: gd.maxParticipants,
    price: gd.price,
    status: gd.status,
    roomId: gd.roomId,
    moderatorName: gd.moderatorMentorProfile?.user?.name ?? null,
    registeredCount: confirmed.length,
    seatsLeft: Math.max(0, gd.maxParticipants - confirmed.length),
    /** The slot only runs once the minimum panel size is met. */
    thresholdMet: confirmed.length >= gd.minParticipants,
    spotsToConfirm: Math.max(0, gd.minParticipants - confirmed.length),
    isRegistered: userId ? confirmed.some((r) => r.userId === userId) : false,
    createdAt: gd.createdAt,
  };
};

const webinarInclude = {
  hostMentorProfile: { select: { user: { select: { name: true, profilePicture: true } } } },
  registrations: { select: { userId: true, status: true } },
};

const discussionInclude = {
  moderatorMentorProfile: { select: { user: { select: { name: true } } } },
  registrations: { select: { userId: true, status: true } },
};

/** Shared Razorpay signature check. */
const assertValidSignature = ({ orderId, paymentId, signature }) => {
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  const provided = Buffer.from(signature);
  const computed = Buffer.from(expected);

  if (provided.length !== computed.length || !crypto.timingSafeEqual(provided, computed)) {
    throw createServiceError(400, 'Payment verification failed — invalid signature');
  }
};

class GroupSessionService {
  // ─── Webinars: public ────────────────────────────────────────────────────

  async listWebinars({ userId, includeAll = false, upcomingOnly = true } = {}) {
    const where = includeAll
      ? {}
      : {
          status: { in: VISIBLE_WEBINAR_STATUSES },
          ...(upcomingOnly ? { endsAt: { gte: new Date() } } : {}),
        };

    const webinars = await prisma.webinar.findMany({
      where,
      include: webinarInclude,
      orderBy: { startsAt: 'asc' },
    });

    return webinars.map((w) => mapWebinar(w, { userId }));
  }

  async getWebinar(idOrSlug, { userId, includeAll = false } = {}) {
    const webinar = await prisma.webinar.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      include: webinarInclude,
    });

    if (!webinar) throw createServiceError(404, 'Webinar not found');
    if (!includeAll && !VISIBLE_WEBINAR_STATUSES.includes(webinar.status)) {
      throw createServiceError(404, 'Webinar not found');
    }

    return mapWebinar(webinar, { userId });
  }

  // ─── Webinars: admin ─────────────────────────────────────────────────────

  async createWebinar(data) {
    const slug = await this._uniqueWebinarSlug(slugify(data.title));

    const webinar = await prisma.webinar.create({
      data: {
        ...data,
        slug,
        roomId: `webinar-${crypto.randomUUID()}`,
        price: data.isPaid ? data.price : 0,
      },
      include: webinarInclude,
    });

    return mapWebinar(webinar);
  }

  async updateWebinar(id, data) {
    const existing = await prisma.webinar.findUnique({ where: { id }, select: { id: true } });
    if (!existing) throw createServiceError(404, 'Webinar not found');

    const webinar = await prisma.webinar.update({
      where: { id },
      data: {
        ...data,
        ...(data.isPaid === false ? { price: 0 } : {}),
      },
      include: webinarInclude,
    });

    return mapWebinar(webinar);
  }

  async deleteWebinar(id) {
    const registrations = await prisma.webinarRegistration.count({
      where: { webinarId: id, status: { in: ACTIVE_REGISTRATION_STATUSES } },
    });

    // People have signed up, so cancel rather than erase the record.
    if (registrations > 0) {
      await prisma.webinar.update({ where: { id }, data: { status: 'CANCELLED' } });
      return { id, cancelled: true };
    }

    await prisma.webinar.delete({ where: { id } }).catch(() => {
      throw createServiceError(404, 'Webinar not found');
    });
    return { id, cancelled: false };
  }

  async _uniqueWebinarSlug(base) {
    const taken = await prisma.webinar.findUnique({ where: { slug: base }, select: { id: true } });
    return taken ? `${base}-${Date.now().toString(36).slice(-4)}` : base;
  }

  // ─── Webinars: registration ──────────────────────────────────────────────

  async registerForWebinar(userId, webinarId) {
    const webinar = await prisma.webinar.findUnique({
      where: { id: webinarId },
      include: webinarInclude,
    });

    if (!webinar) throw createServiceError(404, 'Webinar not found');
    if (!VISIBLE_WEBINAR_STATUSES.includes(webinar.status)) {
      throw createServiceError(400, 'Registration is not open for this webinar');
    }
    if (webinar.endsAt < new Date()) {
      throw createServiceError(400, 'This webinar has already ended');
    }

    const existing = await prisma.webinarRegistration.findUnique({
      where: { webinarId_userId: { webinarId, userId } },
    });
    if (existing && ACTIVE_REGISTRATION_STATUSES.includes(existing.status)) {
      throw createServiceError(409, 'You are already registered for this webinar');
    }

    const confirmed = webinar.registrations.filter((r) =>
      ACTIVE_REGISTRATION_STATUSES.includes(r.status)
    ).length;
    if (webinar.capacity && confirmed >= webinar.capacity) {
      throw createServiceError(409, 'This webinar is full');
    }

    // Free webinars confirm immediately; paid ones wait on Razorpay.
    if (!webinar.isPaid || webinar.price <= 0) {
      const registration = await prisma.webinarRegistration.upsert({
        where: { webinarId_userId: { webinarId, userId } },
        create: { webinarId, userId, status: 'CONFIRMED', amount: 0 },
        update: { status: 'CONFIRMED', amount: 0 },
      });
      return { registration, requiresPayment: false };
    }

    const registration = await prisma.webinarRegistration.upsert({
      where: { webinarId_userId: { webinarId, userId } },
      create: { webinarId, userId, status: 'PAYMENT_PENDING', amount: webinar.price },
      update: { status: 'PAYMENT_PENDING', amount: webinar.price },
    });

    const order = await razorpayInstance.orders.create({
      amount: Math.round(webinar.price * 100),
      currency: 'INR',
      receipt: `web_${registration.id.substring(0, 8)}`,
      notes: { registrationId: registration.id, webinarId, userId },
    });

    await prisma.webinarRegistration.update({
      where: { id: registration.id },
      data: { razorpayOrderId: order.id },
    });

    return {
      registration,
      requiresPayment: true,
      order: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    };
  }

  async verifyWebinarPayment(userId, { registrationId, razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
    const registration = await prisma.webinarRegistration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) throw createServiceError(404, 'Registration not found');
    if (registration.userId !== userId) throw createServiceError(403, 'Unauthorized');
    if (registration.razorpayOrderId !== razorpayOrderId) {
      throw createServiceError(400, 'Payment order does not belong to this registration');
    }
    if (registration.status !== 'PAYMENT_PENDING') {
      throw createServiceError(409, 'This registration has already been processed');
    }

    assertValidSignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    return prisma.webinarRegistration.update({
      where: { id: registrationId },
      data: { status: 'CONFIRMED', razorpayPaymentId, razorpaySignature },
    });
  }

  async cancelWebinarRegistration(userId, webinarId) {
    const registration = await prisma.webinarRegistration.findUnique({
      where: { webinarId_userId: { webinarId, userId } },
    });
    if (!registration) throw createServiceError(404, 'You are not registered for this webinar');

    return prisma.webinarRegistration.update({
      where: { id: registration.id },
      data: { status: 'CANCELLED' },
    });
  }

  async listMyWebinars(userId) {
    const registrations = await prisma.webinarRegistration.findMany({
      where: { userId, status: { in: ACTIVE_REGISTRATION_STATUSES } },
      include: { webinar: { include: webinarInclude } },
      orderBy: { createdAt: 'desc' },
    });

    return registrations.map((r) => ({
      registrationId: r.id,
      status: r.status,
      ...mapWebinar(r.webinar, { userId }),
    }));
  }

  // ─── Group discussions ───────────────────────────────────────────────────

  async listDiscussions({ userId, includeAll = false, upcomingOnly = true } = {}) {
    const where = includeAll
      ? {}
      : {
          status: { in: ['SCHEDULED', 'CONFIRMED', 'LIVE'] },
          ...(upcomingOnly ? { endsAt: { gte: new Date() } } : {}),
        };

    const discussions = await prisma.groupDiscussion.findMany({
      where,
      include: discussionInclude,
      orderBy: { startsAt: 'asc' },
    });

    return discussions.map((gd) => mapDiscussion(gd, { userId }));
  }

  async getDiscussion(id, { userId } = {}) {
    const gd = await prisma.groupDiscussion.findUnique({
      where: { id },
      include: discussionInclude,
    });
    if (!gd) throw createServiceError(404, 'Group discussion not found');

    return mapDiscussion(gd, { userId });
  }

  async createDiscussion(data) {
    const gd = await prisma.groupDiscussion.create({
      data: { ...data, roomId: `gd-${crypto.randomUUID()}` },
      include: discussionInclude,
    });
    return mapDiscussion(gd);
  }

  async updateDiscussion(id, data) {
    const existing = await prisma.groupDiscussion.findUnique({ where: { id }, select: { id: true } });
    if (!existing) throw createServiceError(404, 'Group discussion not found');

    const gd = await prisma.groupDiscussion.update({
      where: { id },
      data,
      include: discussionInclude,
    });
    return mapDiscussion(gd);
  }

  async deleteDiscussion(id) {
    const registrations = await prisma.groupDiscussionRegistration.count({
      where: { groupDiscussionId: id, status: { in: ACTIVE_REGISTRATION_STATUSES } },
    });

    if (registrations > 0) {
      await prisma.groupDiscussion.update({ where: { id }, data: { status: 'CANCELLED' } });
      return { id, cancelled: true };
    }

    await prisma.groupDiscussion.delete({ where: { id } }).catch(() => {
      throw createServiceError(404, 'Group discussion not found');
    });
    return { id, cancelled: false };
  }

  async registerForDiscussion(userId, groupDiscussionId, { shareProfile = false } = {}) {
    const gd = await prisma.groupDiscussion.findUnique({
      where: { id: groupDiscussionId },
      include: discussionInclude,
    });

    if (!gd) throw createServiceError(404, 'Group discussion not found');
    if (!['SCHEDULED', 'CONFIRMED'].includes(gd.status)) {
      throw createServiceError(400, 'Registration is not open for this slot');
    }
    if (gd.startsAt < new Date()) {
      throw createServiceError(400, 'This slot has already started');
    }

    const existing = await prisma.groupDiscussionRegistration.findUnique({
      where: { groupDiscussionId_userId: { groupDiscussionId, userId } },
    });
    if (existing && ACTIVE_REGISTRATION_STATUSES.includes(existing.status)) {
      throw createServiceError(409, 'You are already registered for this slot');
    }

    const confirmed = gd.registrations.filter((r) =>
      ACTIVE_REGISTRATION_STATUSES.includes(r.status)
    ).length;
    if (confirmed >= gd.maxParticipants) {
      throw createServiceError(409, 'This slot is full');
    }

    if (gd.price <= 0) {
      const registration = await prisma.groupDiscussionRegistration.upsert({
        where: { groupDiscussionId_userId: { groupDiscussionId, userId } },
        create: { groupDiscussionId, userId, status: 'CONFIRMED', amount: 0, shareProfile },
        update: { status: 'CONFIRMED', amount: 0, shareProfile },
      });

      await this._syncDiscussionThreshold(groupDiscussionId);
      return { registration, requiresPayment: false };
    }

    const registration = await prisma.groupDiscussionRegistration.upsert({
      where: { groupDiscussionId_userId: { groupDiscussionId, userId } },
      create: { groupDiscussionId, userId, status: 'PAYMENT_PENDING', amount: gd.price, shareProfile },
      update: { status: 'PAYMENT_PENDING', amount: gd.price, shareProfile },
    });

    const order = await razorpayInstance.orders.create({
      amount: Math.round(gd.price * 100),
      currency: 'INR',
      receipt: `gd_${registration.id.substring(0, 8)}`,
      notes: { registrationId: registration.id, groupDiscussionId, userId },
    });

    await prisma.groupDiscussionRegistration.update({
      where: { id: registration.id },
      data: { razorpayOrderId: order.id },
    });

    return {
      registration,
      requiresPayment: true,
      order: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    };
  }

  async verifyDiscussionPayment(userId, { registrationId, razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
    const registration = await prisma.groupDiscussionRegistration.findUnique({
      where: { id: registrationId },
    });

    if (!registration) throw createServiceError(404, 'Registration not found');
    if (registration.userId !== userId) throw createServiceError(403, 'Unauthorized');
    if (registration.razorpayOrderId !== razorpayOrderId) {
      throw createServiceError(400, 'Payment order does not belong to this registration');
    }
    if (registration.status !== 'PAYMENT_PENDING') {
      throw createServiceError(409, 'This registration has already been processed');
    }

    assertValidSignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    const confirmed = await prisma.groupDiscussionRegistration.update({
      where: { id: registrationId },
      data: { status: 'CONFIRMED', razorpayPaymentId, razorpaySignature },
    });

    await this._syncDiscussionThreshold(registration.groupDiscussionId);
    return confirmed;
  }

  async cancelDiscussionRegistration(userId, groupDiscussionId) {
    const registration = await prisma.groupDiscussionRegistration.findUnique({
      where: { groupDiscussionId_userId: { groupDiscussionId, userId } },
    });
    if (!registration) throw createServiceError(404, 'You are not registered for this slot');

    const cancelled = await prisma.groupDiscussionRegistration.update({
      where: { id: registration.id },
      data: { status: 'CANCELLED' },
    });

    await this._syncDiscussionThreshold(groupDiscussionId);
    return cancelled;
  }

  async listMyDiscussions(userId) {
    const registrations = await prisma.groupDiscussionRegistration.findMany({
      where: { userId, status: { in: ACTIVE_REGISTRATION_STATUSES } },
      include: { groupDiscussion: { include: discussionInclude } },
      orderBy: { createdAt: 'desc' },
    });

    return registrations.map((r) => ({
      registrationId: r.id,
      status: r.status,
      shareProfile: r.shareProfile,
      ...mapDiscussion(r.groupDiscussion, { userId }),
    }));
  }

  /** Participants of a GD, for the panel view once the threshold is met. */
  async listDiscussionParticipants(groupDiscussionId) {
    const registrations = await prisma.groupDiscussionRegistration.findMany({
      where: {
        groupDiscussionId,
        status: { in: ACTIVE_REGISTRATION_STATUSES },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePicture: true,
            menteeProfile: {
              select: { education: true, skillsets: true, resumeUrl: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    return registrations.map((r) => ({
      userId: r.user.id,
      name: r.user.name,
      profilePicture: r.user.profilePicture,
      // The profile is only surfaced when the participant opted in.
      profile: r.shareProfile ? r.user.menteeProfile : null,
      sharedProfile: r.shareProfile,
    }));
  }

  /**
   * Flip a slot between SCHEDULED and CONFIRMED as registrations cross the
   * minimum panel size.
   */
  async _syncDiscussionThreshold(groupDiscussionId) {
    const gd = await prisma.groupDiscussion.findUnique({
      where: { id: groupDiscussionId },
      include: { registrations: { select: { status: true } } },
    });
    if (!gd || ['LIVE', 'COMPLETED', 'CANCELLED'].includes(gd.status)) return;

    const confirmed = gd.registrations.filter((r) =>
      ACTIVE_REGISTRATION_STATUSES.includes(r.status)
    ).length;

    const nextStatus = confirmed >= gd.minParticipants ? 'CONFIRMED' : 'SCHEDULED';
    if (nextStatus !== gd.status) {
      await prisma.groupDiscussion.update({
        where: { id: groupDiscussionId },
        data: { status: nextStatus },
      });
    }
  }

  /**
   * Confirm the caller may join a group room, for Agora token issuance.
   *
   * @returns {{ roomId: string, title: string, startsAt: Date, endsAt: Date, isHost: boolean }}
   */
  async authorizeRoomAccess(userId, { webinarId, groupDiscussionId }) {
    if (webinarId) {
      const webinar = await prisma.webinar.findUnique({
        where: { id: webinarId },
        include: {
          hostMentorProfile: { select: { userId: true } },
          registrations: { where: { userId }, select: { status: true } },
        },
      });
      if (!webinar) throw createServiceError(404, 'Webinar not found');

      const isHost = webinar.hostMentorProfile?.userId === userId;
      const isRegistered = webinar.registrations.some((r) =>
        ACTIVE_REGISTRATION_STATUSES.includes(r.status)
      );
      if (!isHost && !isRegistered) {
        throw createServiceError(403, 'Register for this webinar to join');
      }

      return {
        roomId: webinar.roomId,
        title: webinar.title,
        startsAt: webinar.startsAt,
        endsAt: webinar.endsAt,
        isHost,
      };
    }

    const gd = await prisma.groupDiscussion.findUnique({
      where: { id: groupDiscussionId },
      include: {
        moderatorMentorProfile: { select: { userId: true } },
        registrations: { where: { userId }, select: { status: true } },
      },
    });
    if (!gd) throw createServiceError(404, 'Group discussion not found');

    const isHost = gd.moderatorMentorProfile?.userId === userId;
    const isRegistered = gd.registrations.some((r) =>
      ACTIVE_REGISTRATION_STATUSES.includes(r.status)
    );
    if (!isHost && !isRegistered) {
      throw createServiceError(403, 'Register for this slot to join');
    }

    return {
      roomId: gd.roomId,
      title: gd.topic,
      startsAt: gd.startsAt,
      endsAt: gd.endsAt,
      isHost,
    };
  }
}

export default new GroupSessionService();
