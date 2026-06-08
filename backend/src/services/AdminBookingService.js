/**
 * Admin Booking Service
 *
 * View and manage all bookings:
 * - List with filters (status, mentor, mentee, date range)
 * - Booking detail with full context
 * - Admin status override
 * - Admin-initiated cancellation with refund
 */

import { prisma } from '../config/database.js';
import { razorpayInstance } from '../config/razorpay.js';
import { calculateMentorEarning } from '../utils/financialCalculator.js';
import walletService from '../services/WalletService.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class AdminBookingService {
  /**
   * List all bookings with pagination, filters, and search.
   */
  async listBookings({ page = 1, limit = 20, status, mentorProfileId, menteeId, from, to, search } = {}) {
    const where = {};

    if (status) where.status = status;
    if (mentorProfileId) where.mentorProfileId = mentorProfileId;
    if (menteeId) where.menteeId = menteeId;

    if (from || to) {
      where.startTime = {};
      if (from) where.startTime.gte = new Date(from);
      if (to) where.startTime.lte = new Date(to);
    }

    if (search) {
      where.OR = [
        { id: { contains: search, mode: 'insensitive' } },
        { mentee: { name: { contains: search, mode: 'insensitive' } } },
        { mentorProfile: { user: { name: { contains: search, mode: 'insensitive' } } } },
      ];
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          mentee: { select: { id: true, name: true, email: true, profilePicture: true } },
          mentorProfile: {
            include: { user: { select: { name: true, email: true, profilePicture: true } } },
          },
          mentorService: { select: { title: true, price: true, durationMinutes: true } },
          payment: {
            select: {
              id: true, amount: true, paymentStatus: true, platformFee: true,
              mentorAmount: true, paidAt: true, currency: true,
              razorpayPaymentId: true, refundedAmount: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return {
      bookings: bookings.map(this._mapBooking),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  /**
   * Full booking detail with payment, attendance, review, feedback.
   */
  async getBookingDetail(bookingId) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        mentee: { select: { id: true, name: true, email: true, profilePicture: true } },
        mentorProfile: {
          include: { user: { select: { id: true, name: true, email: true, profilePicture: true } } },
        },
        mentorService: { select: { title: true, price: true, durationMinutes: true } },
        payment: true,
        review: {
          include: { author: { select: { name: true } } },
        },
        feedback: true,
        attendance: true,
        parentBooking: { select: { id: true, status: true, startTime: true } },
        rescheduledBookings: { select: { id: true, status: true, startTime: true } },
      },
    });

    if (!booking) throw createServiceError(404, 'Booking not found');

    return this._mapBookingDetail(booking);
  }

  /**
   * Admin override booking status.
   */
  async overrideStatus(bookingId, { status, adminNote }) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { id: true, status: true },
    });

    if (!booking) throw createServiceError(404, 'Booking not found');

    const validStatuses = [
      'CONFIRMED', 'COMPLETED', 'CANCELLED_BY_MENTOR', 'CANCELLED_BY_MENTEE',
      'NO_SHOW_MENTOR', 'NO_SHOW_MENTEE', 'REFUND_INITIATED', 'REFUND_COMPLETED',
    ];

    if (!validStatuses.includes(status)) {
      throw createServiceError(400, `Invalid target status: ${status}`);
    }

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status,
        notes: adminNote
          ? `[Admin Override] ${adminNote} (was: ${booking.status})`
          : booking.notes,
      },
      include: {
        mentee: { select: { name: true } },
        mentorProfile: { include: { user: { select: { name: true } } } },
      },
    });

    if (status === 'COMPLETED' && booking.status !== 'COMPLETED') {
      await walletService.releaseEarningsForCompletedBooking(bookingId);
    }

    return {
      id: updated.id,
      previousStatus: booking.status,
      newStatus: updated.status,
      adminNote: adminNote || null,
      message: `Booking status changed from ${booking.status} to ${status}`,
    };
  }

  /**
   * Admin-initiated cancellation with full refund processing.
   */
  async adminCancel(bookingId, { reason } = {}) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        payment: true,
        mentorProfile: { select: { id: true } },
      },
    });

    if (!booking) throw createServiceError(404, 'Booking not found');

    const terminalStatuses = ['COMPLETED', 'CANCELLED_BY_MENTOR', 'CANCELLED_BY_MENTEE', 'REFUND_COMPLETED'];
    if (terminalStatuses.includes(booking.status)) {
      throw createServiceError(400, `Cannot cancel booking with status: ${booking.status}`);
    }

    // Transaction: cancel booking + process refund
    await prisma.$transaction(async (tx) => {
      // 1. Cancel booking
      await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: 'CANCELLED_BY_MENTEE', // Using mentee cancel for admin-initiated
          cancelledReason: reason ? `[Admin] ${reason}` : '[Admin] Cancelled by administrator',
          cancelledBy: 'ADMIN',
        },
      });

      // 2. If payment was successful, initiate refund
      if (booking.payment?.paymentStatus === 'SUCCESS') {
        await tx.payment.update({
          where: { id: booking.payment.id },
          data: {
            paymentStatus: 'REFUNDED',
            refundedAmount: booking.payment.amount,
            refundReason: reason || 'Admin-initiated cancellation',
          },
        });

        await tx.booking.update({
          where: { id: bookingId },
          data: { status: 'REFUND_INITIATED' },
        });

        // 3. Reverse mentor wallet credit if applicable
        const wallet = await tx.mentorWallet.findUnique({
          where: { mentorProfileId: booking.mentorProfileId },
        });

        if (wallet) {
          const mentorAmount = booking.payment.mentorAmount || calculateMentorEarning(booking.payment.amount);
          const fromPending = Math.min(wallet.pendingBalance, mentorAmount);
          const fromAvailable = mentorAmount - fromPending;

          const updateData = {};
          if (fromPending > 0) updateData.pendingBalance = { decrement: fromPending };
          if (fromAvailable > 0) updateData.availableBalance = { decrement: fromAvailable };

          if (fromPending > 0 || fromAvailable > 0) {
            await tx.mentorWallet.update({
              where: { id: wallet.id },
              data: updateData,
            });

            await tx.walletTransaction.create({
              data: {
                walletId: wallet.id,
                bookingId,
                type: 'REFUND_DEBIT',
                amount: -mentorAmount,
                description: 'Earnings reversed — admin cancellation',
                balanceBefore: wallet.availableBalance,
                balanceAfter: wallet.availableBalance - fromAvailable,
              },
            });
          }
        }
      }
    });

    // Fire-and-forget: Razorpay refund
    if (booking.payment?.razorpayPaymentId && booking.payment?.paymentStatus === 'SUCCESS') {
      this._processRazorpayRefund(booking.payment, booking.payment.amount, bookingId);
    }

    return {
      bookingId,
      message: 'Booking cancelled by admin',
      refundInitiated: booking.payment?.paymentStatus === 'SUCCESS',
    };
  }

  /**
   * Process Razorpay refund (fire-and-forget).
   */
  async _processRazorpayRefund(payment, refundAmount, bookingId) {
    try {
      const refund = await razorpayInstance.payments.refund(payment.razorpayPaymentId, {
        amount: refundAmount * 100,
        notes: { bookingId, reason: 'Admin cancellation' },
      });

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: { razorpayRefundId: refund.id },
        }),
        prisma.booking.update({
          where: { id: bookingId },
          data: { status: 'REFUND_COMPLETED' },
        }),
      ]);
    } catch (err) {
      console.error('[AdminBookingService] Razorpay refund failed:', err.message);
    }
  }

  _mapBooking(b) {
    return {
      id: b.id,
      status: b.status,
      startTime: b.startTime,
      endTime: b.endTime,
      meetingLink: b.meetingLink,
      purposeOfCall: b.purposeOfCall,
      cancelledReason: b.cancelledReason,
      createdAt: b.createdAt,
      mentee: b.mentee ? { id: b.mentee.id, name: b.mentee.name, email: b.mentee.email } : null,
      mentor: b.mentorProfile
        ? { id: b.mentorProfile.id, name: b.mentorProfile.user?.name, email: b.mentorProfile.user?.email }
        : null,
      service: b.mentorService
        ? { title: b.mentorService.title, price: b.mentorService.price, duration: b.mentorService.durationMinutes }
        : null,
      payment: b.payment
        ? {
            id: b.payment.id,
            amount: b.payment.amount,
            status: b.payment.paymentStatus,
            platformFee: b.payment.platformFee,
            mentorAmount: b.payment.mentorAmount,
            paidAt: b.payment.paidAt,
            refundedAmount: b.payment.refundedAmount,
          }
        : null,
    };
  }

  _mapBookingDetail(b) {
    return {
      ...this._mapBooking(b),
      notes: b.notes,
      menteePhone: b.menteePhone,
      menteeEmail: b.menteeEmail,
      discussionTopic: b.discussionTopic,
      specificQuestions: b.specificQuestions,
      payment: b.payment || null,
      review: b.review
        ? {
            id: b.review.id,
            rating: b.review.rating,
            review: b.review.review,
            author: b.review.author?.name,
            createdAt: b.review.createdAt,
          }
        : null,
      feedback: b.feedback || null,
      attendance: b.attendance || null,
      parentBooking: b.parentBooking || null,
      rescheduledBookings: b.rescheduledBookings || [],
    };
  }
}

export default new AdminBookingService();
