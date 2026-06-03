/**
 * Payout Service
 *
 * Mentor requests payout → Admin approves → Processed.
 * Mentors can only request from available balance.
 */

import { prisma } from '../config/database.js';
import walletService from './WalletService.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class PayoutService {
  /**
   * Mentor requests a payout from their available balance.
   */
  async requestPayout(userId, { amount } = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) throw createServiceError(404, 'Mentor profile not found');

    const wallet = await walletService.getOrCreateWallet(profile.id);

    if (!amount || amount <= 0) {
      throw createServiceError(400, 'Payout amount must be positive');
    }

    if (amount > wallet.availableBalance) {
      throw createServiceError(400, `Insufficient available balance. Available: ₹${wallet.availableBalance.toFixed(2)}`);
    }

    // Check for existing pending payout
    const existingPayout = await prisma.payout.findFirst({
      where: {
        mentorProfileId: profile.id,
        status: { in: ['REQUESTED', 'APPROVED', 'PROCESSING'] },
      },
    });

    if (existingPayout) {
      throw createServiceError(400, 'You already have a pending payout request. Wait for it to complete.');
    }

    // Create payout + debit wallet in transaction
    const payout = await prisma.$transaction(async (tx) => {
      // Debit available balance
      await tx.mentorWallet.update({
        where: { id: wallet.id },
        data: {
          availableBalance: { decrement: amount },
          withdrawnBalance: { increment: amount },
        },
      });

      // Create ledger entry
      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'PAYOUT',
          amount: -amount,
          description: `Payout request - ₹${amount.toFixed(2)}`,
          balanceBefore: wallet.availableBalance,
          balanceAfter: wallet.availableBalance - amount,
        },
      });

      // Create payout record
      return tx.payout.create({
        data: {
          mentorProfileId: profile.id,
          amount,
          platformFee: 0, // Fee already deducted at earning time
          netAmount: amount,
          status: 'REQUESTED',
        },
      });
    });

    return this._mapPayout(payout);
  }

  /**
   * Admin approves a payout request.
   */
  async approvePayout(payoutId) {
    const payout = await prisma.payout.findUnique({
      where: { id: payoutId },
    });

    if (!payout) throw createServiceError(404, 'Payout not found');

    if (payout.status !== 'REQUESTED') {
      throw createServiceError(400, `Cannot approve payout with status: ${payout.status}`);
    }

    const updated = await prisma.payout.update({
      where: { id: payoutId },
      data: {
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    });

    return this._mapPayout(updated);
  }

  /**
   * Admin marks payout as completed (after actual transfer).
   */
  async completePayout(payoutId, { transactionRef, payoutMethod } = {}) {
    const payout = await prisma.payout.findUnique({
      where: { id: payoutId },
    });

    if (!payout) throw createServiceError(404, 'Payout not found');

    if (!['APPROVED', 'PROCESSING'].includes(payout.status)) {
      throw createServiceError(400, `Cannot complete payout with status: ${payout.status}`);
    }

    const updated = await prisma.payout.update({
      where: { id: payoutId },
      data: {
        status: 'COMPLETED',
        processedAt: new Date(),
        transactionRef: transactionRef || null,
        payoutMethod: payoutMethod || null,
      },
    });

    return this._mapPayout(updated);
  }

  /**
   * Admin rejects / fails a payout — reverses the wallet debit.
   */
  async failPayout(payoutId, { failedReason } = {}) {
    const payout = await prisma.payout.findUnique({
      where: { id: payoutId },
    });

    if (!payout) throw createServiceError(404, 'Payout not found');

    if (!['REQUESTED', 'APPROVED', 'PROCESSING'].includes(payout.status)) {
      throw createServiceError(400, `Cannot fail payout with status: ${payout.status}`);
    }

    // Reverse the wallet debit
    const wallet = await prisma.mentorWallet.findUnique({
      where: { mentorProfileId: payout.mentorProfileId },
    });

    await prisma.$transaction([
      prisma.payout.update({
        where: { id: payoutId },
        data: {
          status: 'FAILED',
          failedReason: failedReason || null,
        },
      }),
      prisma.mentorWallet.update({
        where: { id: wallet.id },
        data: {
          availableBalance: { increment: payout.amount },
          withdrawnBalance: { decrement: payout.amount },
        },
      }),
      prisma.walletTransaction.create({
        data: {
          walletId: wallet.id,
          type: 'PAYOUT',
          amount: payout.amount,
          description: `Payout reversed - ${failedReason || 'Failed'}`,
          balanceBefore: wallet.availableBalance,
          balanceAfter: wallet.availableBalance + payout.amount,
        },
      }),
    ]);

    return this._mapPayout(await prisma.payout.findUnique({ where: { id: payoutId } }));
  }

  /**
   * Get payout history for a mentor.
   */
  async getPayoutHistory(userId, { page = 1, limit = 20 } = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) throw createServiceError(404, 'Mentor profile not found');

    const where = { mentorProfileId: profile.id };

    const [payouts, total] = await Promise.all([
      prisma.payout.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.payout.count({ where }),
    ]);

    return {
      payouts: payouts.map(this._mapPayout),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Admin: get all payout requests (filterable by status).
   */
  async getAllPayouts({ status, page = 1, limit = 20 } = {}) {
    const where = {};
    if (status) where.status = status;

    const [payouts, total] = await Promise.all([
      prisma.payout.findMany({
        where,
        include: {
          mentorProfile: {
            include: {
              user: { select: { name: true, email: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.payout.count({ where }),
    ]);

    return {
      payouts: payouts.map((p) => ({
        ...this._mapPayout(p),
        mentorName: p.mentorProfile?.user?.name || 'Unknown',
        mentorEmail: p.mentorProfile?.user?.email || '',
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  _mapPayout(p) {
    return {
      id: p.id,
      mentorProfileId: p.mentorProfileId,
      amount: p.amount,
      platformFee: p.platformFee,
      netAmount: p.netAmount,
      status: p.status,
      payoutMethod: p.payoutMethod,
      transactionRef: p.transactionRef,
      requestedAt: p.requestedAt,
      approvedAt: p.approvedAt,
      processedAt: p.processedAt,
      failedReason: p.failedReason,
      createdAt: p.createdAt,
    };
  }
}

export default new PayoutService();
