/**
 * Admin Payment Service
 *
 * Revenue overview & payment management:
 * - List all payments with filters
 * - Revenue summary (monthly, total, breakdown)
 * - Admin-initiated refund
 */

import { prisma } from '../config/database.js';
import { razorpayInstance } from '../config/razorpay.js';
import { calculateMentorEarning } from '../utils/financialCalculator.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class AdminPaymentService {
  /**
   * List all payments with pagination and filters.
   */
  async listPayments({ page = 1, limit = 20, status, from, to } = {}) {
    const where = {};

    if (status) where.paymentStatus = status;

    if (from || to) {
      where.createdAt = {};
      if (from) where.createdAt.gte = new Date(from);
      if (to) where.createdAt.lte = new Date(to);
    }

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          booking: {
            select: {
              id: true,
              status: true,
              startTime: true,
              mentee: { select: { name: true, email: true } },
              mentorProfile: {
                select: { user: { select: { name: true, email: true } } },
              },
              mentorService: { select: { title: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.payment.count({ where }),
    ]);

    return {
      payments: payments.map((p) => ({
        id: p.id,
        bookingId: p.bookingId,
        amount: p.amount,
        platformFee: p.platformFee,
        mentorAmount: p.mentorAmount,
        currency: p.currency,
        paymentStatus: p.paymentStatus,
        paidAt: p.paidAt,
        refundedAmount: p.refundedAmount,
        refundReason: p.refundReason,
        razorpayPaymentId: p.razorpayPaymentId,
        createdAt: p.createdAt,
        booking: p.booking
          ? {
              id: p.booking.id,
              status: p.booking.status,
              startTime: p.booking.startTime,
              menteeName: p.booking.mentee?.name || 'Unknown',
              menteeEmail: p.booking.mentee?.email || '',
              mentorName: p.booking.mentorProfile?.user?.name || 'Unknown',
              mentorEmail: p.booking.mentorProfile?.user?.email || '',
              serviceName: p.booking.mentorService?.title || 'Session',
            }
          : null,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Revenue summary with monthly breakdown.
   */
  async getRevenueSummary() {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const [
      allTimeAgg,
      thisMonthAgg,
      lastMonthAgg,
      refundAgg,
      payoutAgg,
      pendingPayoutAgg,
    ] = await Promise.all([
      // All-time
      prisma.payment.aggregate({
        where: { paymentStatus: 'SUCCESS' },
        _sum: { amount: true, platformFee: true, mentorAmount: true },
        _count: { id: true },
      }),
      // This month
      prisma.payment.aggregate({
        where: { paymentStatus: 'SUCCESS', paidAt: { gte: monthStart } },
        _sum: { amount: true, platformFee: true, mentorAmount: true },
        _count: { id: true },
      }),
      // Last month
      prisma.payment.aggregate({
        where: {
          paymentStatus: 'SUCCESS',
          paidAt: { gte: lastMonthStart, lte: lastMonthEnd },
        },
        _sum: { amount: true, platformFee: true },
        _count: { id: true },
      }),
      // Refunds
      prisma.payment.aggregate({
        where: { paymentStatus: { in: ['REFUNDED', 'PARTIALLY_REFUNDED'] } },
        _sum: { refundedAmount: true },
        _count: { id: true },
      }),
      // Completed payouts
      prisma.payout.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { netAmount: true },
        _count: { id: true },
      }),
      // Pending payouts
      prisma.payout.aggregate({
        where: { status: { in: ['REQUESTED', 'APPROVED', 'PROCESSING'] } },
        _sum: { netAmount: true },
        _count: { id: true },
      }),
    ]);

    return {
      allTime: {
        totalCollected: allTimeAgg._sum.amount ?? 0,
        platformEarnings: allTimeAgg._sum.platformFee ?? 0,
        mentorEarnings: allTimeAgg._sum.mentorAmount ?? 0,
        transactionCount: allTimeAgg._count.id,
      },
      thisMonth: {
        totalCollected: thisMonthAgg._sum.amount ?? 0,
        platformEarnings: thisMonthAgg._sum.platformFee ?? 0,
        mentorEarnings: thisMonthAgg._sum.mentorAmount ?? 0,
        transactionCount: thisMonthAgg._count.id,
      },
      lastMonth: {
        totalCollected: lastMonthAgg._sum.amount ?? 0,
        platformEarnings: lastMonthAgg._sum.platformFee ?? 0,
        transactionCount: lastMonthAgg._count.id,
      },
      refunds: {
        totalRefunded: refundAgg._sum.refundedAmount ?? 0,
        refundCount: refundAgg._count.id,
      },
      payouts: {
        completedTotal: payoutAgg._sum.netAmount ?? 0,
        completedCount: payoutAgg._count.id,
        pendingTotal: pendingPayoutAgg._sum.netAmount ?? 0,
        pendingCount: pendingPayoutAgg._count.id,
      },
    };
  }

  /**
   * Admin-initiated refund.
   */
  async adminRefund(paymentId, { amount, reason } = {}) {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        booking: {
          select: { id: true, mentorProfileId: true },
        },
      },
    });

    if (!payment) throw createServiceError(404, 'Payment not found');

    if (payment.paymentStatus !== 'SUCCESS') {
      throw createServiceError(400, `Cannot refund payment with status: ${payment.paymentStatus}`);
    }

    const refundAmount = amount || payment.amount;

    if (refundAmount > payment.amount) {
      throw createServiceError(400, 'Refund amount exceeds payment amount');
    }

    const isFullRefund = refundAmount === payment.amount;

    // Update payment + reverse wallet in transaction
    await prisma.$transaction(async (tx) => {
      await tx.payment.update({
        where: { id: paymentId },
        data: {
          paymentStatus: isFullRefund ? 'REFUNDED' : 'PARTIALLY_REFUNDED',
          refundedAmount: refundAmount,
          refundReason: reason || 'Admin-initiated refund',
        },
      });

      if (isFullRefund) {
        await tx.booking.update({
          where: { id: payment.bookingId },
          data: { status: 'REFUND_INITIATED' },
        });
      }

      // Reverse mentor wallet credit
      const wallet = await tx.mentorWallet.findUnique({
        where: { mentorProfileId: payment.booking.mentorProfileId },
      });

      if (wallet) {
        const mentorAmount = payment.mentorAmount || calculateMentorEarning(refundAmount);
        const fromPending = Math.min(wallet.pendingBalance, mentorAmount);
        const fromAvailable = mentorAmount - fromPending;

        const updateData = {};
        if (fromPending > 0) updateData.pendingBalance = { decrement: fromPending };
        if (fromAvailable > 0) updateData.availableBalance = { decrement: fromAvailable };

        if (fromPending > 0 || fromAvailable > 0) {
          await tx.mentorWallet.update({ where: { id: wallet.id }, data: updateData });
          await tx.walletTransaction.create({
            data: {
              walletId: wallet.id,
              bookingId: payment.bookingId,
              type: 'REFUND_DEBIT',
              amount: -mentorAmount,
              description: `Admin refund — ${reason || 'No reason'}`,
              balanceBefore: wallet.availableBalance,
              balanceAfter: wallet.availableBalance - fromAvailable,
            },
          });
        }
      }
    });

    // Fire-and-forget: Razorpay refund
    if (payment.razorpayPaymentId) {
      try {
        const refund = await razorpayInstance.payments.refund(payment.razorpayPaymentId, {
          amount: refundAmount * 100,
          notes: { bookingId: payment.bookingId, reason: reason || 'Admin refund' },
        });
        await prisma.payment.update({
          where: { id: paymentId },
          data: { razorpayRefundId: refund.id },
        });
      } catch (err) {
        console.error('[AdminPaymentService] Razorpay refund failed:', err.message);
      }
    }

    return {
      paymentId,
      refundAmount,
      isFullRefund,
      message: `Refund of ₹${refundAmount} processed`,
    };
  }
}

export default new AdminPaymentService();
