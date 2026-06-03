/**
 * Cancellation Service
 *
 * Handles booking cancellations for both mentors and mentees.
 * 
 * Refund Policy (from financialCalculator):
 * - > 24h before session: 100% refund
 * - 12-24h before session: 50% refund
 * - < 12h before session: 0% refund
 *
 * Mentor cancellations always trigger 100% refund to mentee,
 * plus penalty tracking and potential wallet debit.
 */

import { prisma } from '../config/database.js';
import { razorpayInstance } from '../config/razorpay.js';
import { assertTransition, CANCELLED_STATUSES } from '../utils/bookingStateMachine.js';
import {
  calculateMenteeCancellationRefund,
  calculateMentorCancellationRefund,
  calculateMentorEarning,
  RATES,
} from '../utils/financialCalculator.js';
import walletService from './WalletService.js';
import emailService from './EmailService.js';
import { emitSlotUpdate } from '../config/socket.js';
import { utcToIst } from '../utils/timezoneUtils.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class CancellationService {
  /**
   * Cancel a booking (both mentor and mentee supported).
   *
   * @param {string} userId - The authenticated user's ID
   * @param {string} bookingId - The booking to cancel
   * @param {Object} payload - { reason?: string }
   * @returns {Object} Cancellation result with refund details
   */
  async cancelBooking(userId, bookingId, { reason } = {}) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        mentorProfile: {
          include: { user: { select: { id: true, name: true, email: true } } },
        },
        mentee: { select: { id: true, name: true, email: true } },
        mentorService: { select: { title: true, durationMinutes: true, price: true } },
        payment: true,
      },
    });

    if (!booking) throw createServiceError(404, 'Booking not found');

    const isMentee = booking.menteeId === userId;
    const isMentor = booking.mentorProfile?.userId === userId;

    if (!isMentee && !isMentor) {
      throw createServiceError(403, 'Not authorized to cancel this booking');
    }

    // Determine target status
    const targetStatus = isMentor ? 'CANCELLED_BY_MENTOR' : 'CANCELLED_BY_MENTEE';

    // Validate transition is allowed
    assertTransition(booking.status, targetStatus);

    // Calculate refund
    const hoursUntilSession = (new Date(booking.startTime).getTime() - Date.now()) / (1000 * 60 * 60);
    const refundResult = this._calculateRefund(booking, isMentor, hoursUntilSession);

    // Execute cancellation in transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Update booking status
      const updatedBooking = await tx.booking.update({
        where: { id: bookingId },
        data: {
          status: targetStatus,
          cancelledReason: reason || null,
          cancelledBy: userId,
        },
      });

      // 2. Process refund if payment exists and was successful
      if (refundResult.refundAmount > 0 && booking.payment?.paymentStatus === 'SUCCESS') {
        // Update payment status
        await tx.payment.update({
          where: { id: booking.payment.id },
          data: {
            paymentStatus: refundResult.refundPercentage === 100 ? 'REFUNDED' : 'PARTIALLY_REFUNDED',
          },
        });

        // Update booking to refund state
        await tx.booking.update({
          where: { id: bookingId },
          data: { status: 'REFUND_INITIATED' },
        });
      }

      // 3. Debit mentor wallet if earnings were credited
      if (booking.payment?.paymentStatus === 'SUCCESS') {
        const mentorAmount = booking.payment.mentorAmount || calculateMentorEarning(booking.payment.amount);
        const wallet = await tx.mentorWallet.findUnique({
          where: { mentorProfileId: booking.mentorProfileId },
        });

        if (wallet) {
          // Deduct from pending first, then available
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
                description: `Earnings reversed — ${isMentor ? 'mentor' : 'mentee'} cancelled`,
                balanceBefore: wallet.availableBalance,
                balanceAfter: wallet.availableBalance - fromAvailable,
              },
            });
          }
        }
      }

      // 4. Track mentor cancellation stats (if mentor cancelled)
      if (isMentor) {
        const currentYear = new Date().getFullYear();
        await tx.mentorCancellationStat.upsert({
          where: {
            mentorProfileId_year: {
              mentorProfileId: booking.mentorProfileId,
              year: currentYear,
            },
          },
          update: {
            cancellationCount: { increment: 1 },
          },
          create: {
            mentorProfileId: booking.mentorProfileId,
            year: currentYear,
            cancellationCount: 1,
          },
        });
      }

      return updatedBooking;
    });

    // Fire-and-forget: Razorpay refund
    if (refundResult.refundAmount > 0 && booking.payment?.razorpayPaymentId) {
      this._processRazorpayRefund(booking.payment, refundResult.refundAmount, bookingId);
    }

    // Emit slot release
    emitSlotUpdate(booking.mentorProfileId, {
      startTime: utcToIst(booking.startTime),
      endTime: utcToIst(booking.endTime),
      serviceId: booking.mentorServiceId,
      action: 'released',
    });

    // Fire-and-forget: cancellation emails
    this._sendCancellationEmails(booking, isMentor, reason, refundResult);

    return {
      bookingId: result.id,
      status: result.status,
      cancelledBy: isMentor ? 'mentor' : 'mentee',
      refund: {
        eligible: refundResult.refundAmount > 0,
        percentage: refundResult.refundPercentage,
        amount: refundResult.refundAmount,
        currency: booking.payment?.currency || 'INR',
      },
    };
  }

  /**
   * Calculate refund based on who cancelled and when.
   */
  _calculateRefund(booking, isMentor, hoursUntilSession) {
    const paymentAmount = booking.payment?.amount || 0;

    if (paymentAmount === 0 || booking.payment?.paymentStatus !== 'SUCCESS') {
      return { refundPercentage: 0, refundAmount: 0 };
    }

    // Mentor cancels → always 100% refund to mentee
    if (isMentor) {
      const { menteeRefund } = calculateMentorCancellationRefund(paymentAmount);
      return { refundPercentage: 100, refundAmount: menteeRefund };
    }

    // Mentee cancels → refund based on time until session
    const { menteeRefund, mentorShare, platformShare } = calculateMenteeCancellationRefund(
      paymentAmount,
      booking.startTime
    );
    const refundPercentage = paymentAmount > 0 ? Math.round((menteeRefund / paymentAmount) * 100) : 0;

    return { refundPercentage, refundAmount: menteeRefund, mentorShare, platformShare };
  }

  /**
   * Process Razorpay refund (fire-and-forget).
   */
  async _processRazorpayRefund(payment, refundAmount, bookingId) {
    try {
      const refund = await razorpayInstance.payments.refund(payment.razorpayPaymentId, {
        amount: refundAmount * 100, // Razorpay uses paise
        notes: {
          bookingId,
          reason: 'Booking cancellation',
        },
      });

      // Update payment with refund ID
      await prisma.payment.update({
        where: { id: payment.id },
        data: { razorpayRefundId: refund.id },
      });

      // Mark booking as refund completed
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'REFUND_COMPLETED' },
      });

      console.log(`[CancellationService] Razorpay refund processed: ${refund.id} for booking ${bookingId}`);
    } catch (err) {
      console.error('[CancellationService] Razorpay refund failed:', err.message);
      // Don't throw — the cancellation itself succeeded
    }
  }

  /**
   * Send cancellation notification emails (fire-and-forget).
   */
  async _sendCancellationEmails(booking, isMentor, reason, refundResult) {
    try {
      const mentorName = booking.mentorProfile?.user?.name || 'Mentor';
      const menteeName = booking.mentee?.name || 'Mentee';
      const serviceName = booking.mentorService?.title || 'Session';

      // Email content depends on who cancelled
      const cancelledByLabel = isMentor ? mentorName : menteeName;
      const subject = `Session Cancelled by ${cancelledByLabel}`;

      const emailData = {
        subject,
        cancelledBy: cancelledByLabel,
        mentorName,
        menteeName,
        serviceName,
        sessionDate: booking.startTime,
        reason: reason || 'No reason provided',
        refundPercentage: refundResult.refundPercentage,
        refundAmount: refundResult.refundAmount,
      };

      // Notify mentee
      if (booking.mentee?.email) {
        await emailService.sendCancellationEmail?.(booking.mentee.email, emailData);
      }

      // Notify mentor
      if (booking.mentorProfile?.user?.email) {
        await emailService.sendCancellationEmail?.(booking.mentorProfile.user.email, emailData);
      }
    } catch (err) {
      console.error('[CancellationService] Failed to send cancellation email:', err.message);
    }
  }
}

export default new CancellationService();
