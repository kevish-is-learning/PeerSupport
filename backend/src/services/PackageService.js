/**
 * Session Package Service
 *
 * Mentors sell bundles of sessions at a discount; mentees buy a bundle once and
 * redeem it across bookings. Redemption is what makes a booking free at
 * checkout — see BookingService.
 */

import { prisma } from '../config/database.js';
import { razorpayInstance } from '../config/razorpay.js';
import crypto from 'crypto';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const mapPackage = (pkg) => ({
  id: pkg.id,
  title: pkg.title,
  description: pkg.description,
  sessionCount: pkg.sessionCount,
  price: pkg.price,
  validityDays: pkg.validityDays,
  isActive: pkg.isActive,
  mentorProfileId: pkg.mentorProfileId,
  mentorServiceId: pkg.mentorServiceId,
  serviceName: pkg.mentorService?.title ?? null,
  serviceDurationMinutes: pkg.mentorService?.durationMinutes ?? null,
  /** What the same number of sessions would cost bought individually. */
  listPrice: pkg.mentorService ? pkg.mentorService.price * pkg.sessionCount : null,
  perSessionPrice: Math.round((pkg.price / pkg.sessionCount) * 100) / 100,
  mentorName: pkg.mentorProfile?.user?.name ?? null,
  createdAt: pkg.createdAt,
});

const mapPurchase = (purchase) => ({
  id: purchase.id,
  packageId: purchase.packageId,
  title: purchase.package?.title ?? null,
  mentorProfileId: purchase.package?.mentorProfileId ?? null,
  mentorName: purchase.package?.mentorProfile?.user?.name ?? null,
  mentorServiceId: purchase.package?.mentorServiceId ?? null,
  serviceName: purchase.package?.mentorService?.title ?? null,
  sessionsTotal: purchase.sessionsTotal,
  sessionsUsed: purchase.sessionsUsed,
  sessionsRemaining: purchase.sessionsTotal - purchase.sessionsUsed,
  amount: purchase.amount,
  status: purchase.status,
  expiresAt: purchase.expiresAt,
  paidAt: purchase.paidAt,
  createdAt: purchase.createdAt,
});

const packageInclude = {
  mentorService: { select: { title: true, price: true, durationMinutes: true } },
  mentorProfile: { select: { user: { select: { name: true } } } },
};

class PackageService {
  // ─── Mentor: manage packages ─────────────────────────────────────────────

  async _requireMentorProfile(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    if (!profile) throw createServiceError(404, 'Mentor profile not found');
    return profile;
  }

  async listMyPackages(userId) {
    const profile = await this._requireMentorProfile(userId);

    const packages = await prisma.sessionPackage.findMany({
      where: { mentorProfileId: profile.id },
      include: { ...packageInclude, _count: { select: { purchases: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return packages.map((p) => ({ ...mapPackage(p), totalPurchases: p._count.purchases }));
  }

  async createPackage(userId, data) {
    const profile = await this._requireMentorProfile(userId);

    const service = await prisma.mentorService.findFirst({
      where: { id: data.mentorServiceId, mentorProfileId: profile.id },
      select: { id: true, price: true },
    });
    if (!service) throw createServiceError(404, 'Service not found on your profile');

    // A bundle that costs more than buying individually is almost certainly a
    // slip, and mentees would never buy it.
    if (data.price > service.price * data.sessionCount) {
      throw createServiceError(
        400,
        'Package price cannot exceed the cost of booking those sessions individually'
      );
    }

    const pkg = await prisma.sessionPackage.create({
      data: { ...data, mentorProfileId: profile.id },
      include: packageInclude,
    });

    return mapPackage(pkg);
  }

  async updatePackage(userId, packageId, data) {
    const profile = await this._requireMentorProfile(userId);

    const existing = await prisma.sessionPackage.findFirst({
      where: { id: packageId, mentorProfileId: profile.id },
      select: { id: true },
    });
    if (!existing) throw createServiceError(404, 'Package not found');

    const pkg = await prisma.sessionPackage.update({
      where: { id: packageId },
      data,
      include: packageInclude,
    });

    return mapPackage(pkg);
  }

  async deletePackage(userId, packageId) {
    const profile = await this._requireMentorProfile(userId);

    const existing = await prisma.sessionPackage.findFirst({
      where: { id: packageId, mentorProfileId: profile.id },
      include: { _count: { select: { purchases: true } } },
    });
    if (!existing) throw createServiceError(404, 'Package not found');

    // Purchases must keep resolving to their package, so retire instead of delete.
    if (existing._count.purchases > 0) {
      await prisma.sessionPackage.update({
        where: { id: packageId },
        data: { isActive: false },
      });
      return { id: packageId, retired: true };
    }

    await prisma.sessionPackage.delete({ where: { id: packageId } });
    return { id: packageId, retired: false };
  }

  // ─── Public: browse a mentor's packages ──────────────────────────────────

  async listPackagesForMentor(mentorProfileId) {
    const packages = await prisma.sessionPackage.findMany({
      where: { mentorProfileId, isActive: true },
      include: packageInclude,
      orderBy: { price: 'asc' },
    });

    return packages.map(mapPackage);
  }

  // ─── Mentee: purchase & redeem ───────────────────────────────────────────

  /**
   * Start a package purchase — creates a PAYMENT_PENDING row plus a Razorpay
   * order. The pack only becomes redeemable once payment is verified.
   */
  async initiatePurchase(menteeId, packageId) {
    const pkg = await prisma.sessionPackage.findFirst({
      where: { id: packageId, isActive: true },
      include: packageInclude,
    });
    if (!pkg) throw createServiceError(404, 'Package not found or no longer offered');

    const purchase = await prisma.packagePurchase.create({
      data: {
        packageId: pkg.id,
        menteeId,
        sessionsTotal: pkg.sessionCount,
        amount: pkg.price,
      },
    });

    const order = await razorpayInstance.orders.create({
      amount: Math.round(pkg.price * 100),
      currency: 'INR',
      receipt: `pkg_${purchase.id.substring(0, 8)}`,
      notes: { purchaseId: purchase.id, packageId: pkg.id, menteeId },
    });

    await prisma.packagePurchase.update({
      where: { id: purchase.id },
      data: { razorpayOrderId: order.id },
    });

    return {
      purchaseId: purchase.id,
      package: mapPackage(pkg),
      order: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    };
  }

  /**
   * Verify the Razorpay signature and activate the pack.
   */
  async verifyPurchase(menteeId, { purchaseId, razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
    if (!purchaseId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      throw createServiceError(400, 'Missing payment verification data');
    }

    const purchase = await prisma.packagePurchase.findUnique({
      where: { id: purchaseId },
      include: { package: { include: packageInclude } },
    });

    if (!purchase) throw createServiceError(404, 'Purchase not found');
    if (purchase.menteeId !== menteeId) throw createServiceError(403, 'Unauthorized');
    if (purchase.razorpayOrderId !== razorpayOrderId) {
      throw createServiceError(400, 'Payment order does not belong to this purchase');
    }
    if (purchase.status !== 'PAYMENT_PENDING') {
      throw createServiceError(409, 'This purchase has already been processed');
    }

    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    const provided = Buffer.from(razorpaySignature);
    const computed = Buffer.from(expected);
    const valid =
      provided.length === computed.length && crypto.timingSafeEqual(provided, computed);

    if (!valid) {
      await prisma.packagePurchase.update({
        where: { id: purchaseId },
        data: { status: 'CANCELLED' },
      });
      throw createServiceError(400, 'Payment verification failed — invalid signature');
    }

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + (purchase.package?.validityDays ?? 180));

    const activated = await prisma.packagePurchase.update({
      where: { id: purchaseId },
      data: {
        status: 'ACTIVE',
        razorpayPaymentId,
        razorpaySignature,
        paidAt: new Date(),
        expiresAt,
      },
      include: { package: { include: packageInclude } },
    });

    return mapPurchase(activated);
  }

  async listMyPurchases(menteeId) {
    const purchases = await prisma.packagePurchase.findMany({
      where: { menteeId, status: { in: ['ACTIVE', 'EXHAUSTED', 'EXPIRED'] } },
      include: { package: { include: packageInclude } },
      orderBy: { createdAt: 'desc' },
    });

    return purchases.map(mapPurchase);
  }

  /**
   * Packs the mentee can redeem right now against a given mentor+service.
   */
  async listRedeemable(menteeId, { mentorProfileId, mentorServiceId } = {}) {
    const purchases = await prisma.packagePurchase.findMany({
      where: {
        menteeId,
        status: 'ACTIVE',
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        package: {
          ...(mentorProfileId ? { mentorProfileId } : {}),
          ...(mentorServiceId ? { mentorServiceId } : {}),
        },
      },
      include: { package: { include: packageInclude } },
      orderBy: { expiresAt: 'asc' },
    });

    return purchases
      .filter((p) => p.sessionsUsed < p.sessionsTotal)
      .map(mapPurchase);
  }

  /**
   * Consume one session from a pack, inside the caller's transaction so the
   * booking and the decrement commit together.
   *
   * @param {import('@prisma/client').Prisma.TransactionClient} tx
   */
  async redeemOne(tx, { purchaseId, menteeId, mentorProfileId, mentorServiceId }) {
    const purchase = await tx.packagePurchase.findUnique({
      where: { id: purchaseId },
      include: { package: true },
    });

    if (!purchase) throw createServiceError(404, 'Package purchase not found');
    if (purchase.menteeId !== menteeId) throw createServiceError(403, 'This package is not yours');
    if (purchase.status !== 'ACTIVE') {
      throw createServiceError(400, `This package is ${purchase.status.toLowerCase()}`);
    }
    if (purchase.expiresAt && purchase.expiresAt < new Date()) {
      await tx.packagePurchase.update({ where: { id: purchaseId }, data: { status: 'EXPIRED' } });
      throw createServiceError(400, 'This package has expired');
    }
    if (purchase.sessionsUsed >= purchase.sessionsTotal) {
      throw createServiceError(400, 'This package has no sessions left');
    }
    if (purchase.package.mentorProfileId !== mentorProfileId) {
      throw createServiceError(400, 'This package belongs to a different mentor');
    }
    if (purchase.package.mentorServiceId !== mentorServiceId) {
      throw createServiceError(400, 'This package does not cover the selected service');
    }

    const sessionsUsed = purchase.sessionsUsed + 1;

    return tx.packagePurchase.update({
      where: { id: purchaseId },
      data: {
        sessionsUsed,
        status: sessionsUsed >= purchase.sessionsTotal ? 'EXHAUSTED' : 'ACTIVE',
      },
    });
  }

  /** Give a session back when a package-funded booking is cancelled. */
  async refundOne(purchaseId) {
    const purchase = await prisma.packagePurchase.findUnique({ where: { id: purchaseId } });
    if (!purchase || purchase.sessionsUsed === 0) return null;

    return prisma.packagePurchase.update({
      where: { id: purchaseId },
      data: {
        sessionsUsed: purchase.sessionsUsed - 1,
        status: purchase.status === 'EXHAUSTED' ? 'ACTIVE' : purchase.status,
      },
    });
  }
}

export default new PackageService();
