/**
 * Group Session Service
 *
 * Webinars: registration, Razorpay checkout and the video room.
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

const webinarInclude = {
  hostMentorProfile: { select: { user: { select: { name: true, profilePicture: true } } } },
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

  /**
   * Confirm the caller may join a webinar room, for Agora token issuance.
   *
   * @returns {{ roomId: string, title: string, startsAt: Date, endsAt: Date, isHost: boolean }}
   */
  async authorizeRoomAccess(userId, { webinarId }) {
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
}

export default new GroupSessionService();
