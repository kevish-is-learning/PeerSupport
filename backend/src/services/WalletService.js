/**
 * Wallet Service
 *
 * Manages mentor wallets: pending/available/withdrawn balances
 * and the immutable transaction ledger.
 */

import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class WalletService {
  /**
   * Get or create a mentor's wallet.
   */
  async getOrCreateWallet(mentorProfileId) {
    let wallet = await prisma.mentorWallet.findUnique({
      where: { mentorProfileId },
    });

    if (!wallet) {
      wallet = await prisma.mentorWallet.create({
        data: {
          mentorProfileId,
          pendingBalance: 0,
          availableBalance: 0,
          withdrawnBalance: 0,
        },
      });
    }

    return wallet;
  }

  /**
   * Get wallet summary for a mentor.
   */
  async getWallet(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) throw createServiceError(404, 'Mentor profile not found');

    const wallet = await this.getOrCreateWallet(profile.id);

    return {
      id: wallet.id,
      pendingBalance: wallet.pendingBalance,
      availableBalance: wallet.availableBalance,
      withdrawnBalance: wallet.withdrawnBalance,
      totalEarned: wallet.pendingBalance + wallet.availableBalance + wallet.withdrawnBalance,
    };
  }

  /**
   * Get paginated transaction history for a mentor.
   */
  async getTransactions(userId, { page = 1, limit = 20, type } = {}) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) throw createServiceError(404, 'Mentor profile not found');

    const wallet = await this.getOrCreateWallet(profile.id);

    const where = { walletId: wallet.id };
    if (type) where.type = type;

    const [transactions, total] = await Promise.all([
      prisma.walletTransaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.walletTransaction.count({ where }),
    ]);

    return {
      transactions: transactions.map((t) => ({
        id: t.id,
        type: t.type,
        amount: t.amount,
        description: t.description,
        balanceBefore: t.balanceBefore,
        balanceAfter: t.balanceAfter,
        bookingId: t.bookingId,
        createdAt: t.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Release pending earnings → available (called after session completion + attendance).
   */
  async releasePending(walletId, amount, bookingId) {
    return prisma.$transaction(async (tx) => {
      const wallet = await tx.mentorWallet.findUnique({
        where: { id: walletId },
      });

      if (!wallet) throw createServiceError(404, 'Wallet not found');
      if (wallet.pendingBalance < amount) {
        throw createServiceError(400, 'Insufficient pending balance');
      }

      await tx.mentorWallet.update({
        where: { id: walletId },
        data: {
          pendingBalance: { decrement: amount },
          availableBalance: { increment: amount },
        },
      });

      await tx.walletTransaction.create({
        data: {
          walletId,
          bookingId,
          type: 'EARNING',
          amount,
          description: 'Earnings released after session completion',
          balanceBefore: wallet.availableBalance,
          balanceAfter: wallet.availableBalance + amount,
        },
      });
    });
  }

  /**
   * Debit penalty from available balance.
   */
  async debitPenalty(walletId, amount, bookingId, reason) {
    return prisma.$transaction(async (tx) => {
      const wallet = await tx.mentorWallet.findUnique({
        where: { id: walletId },
      });

      if (!wallet) throw createServiceError(404, 'Wallet not found');

      // Penalty can go negative (deducted from future payouts)
      await tx.mentorWallet.update({
        where: { id: walletId },
        data: {
          availableBalance: { decrement: amount },
        },
      });

      await tx.walletTransaction.create({
        data: {
          walletId,
          bookingId,
          type: 'PENALTY',
          amount: -amount,
          description: reason || 'Cancellation penalty',
          balanceBefore: wallet.availableBalance,
          balanceAfter: wallet.availableBalance - amount,
        },
      });
    });
  }

  /**
   * Debit for refund (when mentor cancels and already earned).
   */
  async debitRefund(walletId, amount, bookingId) {
    return prisma.$transaction(async (tx) => {
      const wallet = await tx.mentorWallet.findUnique({
        where: { id: walletId },
      });

      if (!wallet) throw createServiceError(404, 'Wallet not found');

      // Deduct from pending first, then available
      let fromPending = Math.min(wallet.pendingBalance, amount);
      let fromAvailable = amount - fromPending;

      await tx.mentorWallet.update({
        where: { id: walletId },
        data: {
          pendingBalance: { decrement: fromPending },
          availableBalance: { decrement: fromAvailable },
        },
      });

      await tx.walletTransaction.create({
        data: {
          walletId,
          bookingId,
          type: 'REFUND_DEBIT',
          amount: -amount,
          description: 'Earnings reversed due to cancellation/refund',
          balanceBefore: wallet.availableBalance,
          balanceAfter: wallet.availableBalance - fromAvailable,
        },
      });
    });
  }
}

export default new WalletService();
