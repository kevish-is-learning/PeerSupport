import { prisma } from '../config/database.js';
import { razorpayInstance } from '../config/razorpay.js';
import { emitSlotUpdate } from '../config/socket.js';
import { utcToIst } from '../utils/timezoneUtils.js';
import emailService from './EmailService.js';
import { calculatePlatformFee, calculateMentorEarning } from '../utils/financialCalculator.js';
import crypto from 'crypto';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class PaymentService {
  /**
   * Verify and confirm a Razorpay payment.
   *
   * Flow:
   * 1. Verify the signature using HMAC SHA256.
   * 2. Update the Payment record (razorpayPaymentId, razorpaySignature, status → SUCCESS).
   * 3. Update the Booking status to CONFIRMED.
   *
   * This is the ONLY path that creates a confirmed booking.
   */
  async verifyPayment(userId, payload) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = payload;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
      throw createServiceError(400, 'Missing payment verification data');
    }

    // 1. Find the payment by Razorpay order ID
    const payment = await prisma.payment.findFirst({
      where: { razorpayOrderId: razorpay_order_id },
      include: {
        booking: {
          select: {
            id: true,
            menteeId: true,
            status: true,
            startTime: true,
            endTime: true,
            purposeOfCall: true,
            mentorProfileId: true,
            mentorServiceId: true,
          },
        },
      },
    });

    if (!payment) {
      throw createServiceError(404, 'Payment not found for this order');
    }

    if (payment.booking.id !== bookingId) {
      throw createServiceError(400, 'Payment order does not belong to this booking');
    }

    if (payment.booking.menteeId !== userId) {
      throw createServiceError(403, 'Unauthorized');
    }

    if (payment.paymentStatus === 'SUCCESS') {
      return { message: 'Payment already verified', bookingId: payment.booking.id };
    }

    // 2. Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const signatureIsValid =
      generatedSignature.length === razorpay_signature.length &&
      crypto.timingSafeEqual(Buffer.from(generatedSignature), Buffer.from(razorpay_signature));

    if (!signatureIsValid) {
      // Signature invalid → mark payment FAILED and cancel booking immediately
      const updatedBooking = await prisma.$transaction(async (tx) => {
        const updated = await tx.booking.updateMany({
          where: { id: payment.booking.id, status: 'PAYMENT_PENDING' },
          data: { status: 'CANCELLED_BY_MENTEE' },
        });
        if (updated.count !== 1) return null;

        await tx.payment.updateMany({
          where: { id: payment.id, paymentStatus: 'PENDING' },
          data: { paymentStatus: 'FAILED' },
        });
        return tx.booking.findUnique({
          where: { id: payment.booking.id },
          select: { mentorProfileId: true, mentorServiceId: true, startTime: true, endTime: true },
        });
      });

      if (updatedBooking) emitSlotUpdate(updatedBooking.mentorProfileId, {
        startTime: utcToIst(updatedBooking.startTime),
        endTime: utcToIst(updatedBooking.endTime),
        serviceId: updatedBooking.mentorServiceId,
        action: 'released',
      });
      throw createServiceError(400, 'Payment verification failed — invalid signature');
    }

    // 3. Update payment and booking in a transaction
    const amount = payment.amount;
    const platformFee = calculatePlatformFee(amount);
    const mentorAmount = calculateMentorEarning(amount);

    const updatedPayment = await prisma.$transaction(async (tx) => {
      // A cancelled/expired slot must never be revived by a delayed callback.
      const claimedBooking = await tx.booking.updateMany({
        where: { id: payment.booking.id, status: 'PAYMENT_PENDING' },
        data: { status: 'CONFIRMED', meetingLink: `/meeting/${payment.booking.id}` },
      });
      if (claimedBooking.count !== 1) {
        const current = await tx.payment.findUnique({ where: { id: payment.id } });
        if (current?.paymentStatus === 'SUCCESS') return current;
        throw createServiceError(409, 'Booking is no longer awaiting payment');
      }

      const claimedPayment = await tx.payment.updateMany({
        where: { id: payment.id, paymentStatus: 'PENDING' },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paymentStatus: 'SUCCESS',
          platformFee,
          mentorAmount,
          paidAt: new Date(),
        },
      });
      if (claimedPayment.count !== 1) {
        throw createServiceError(409, 'Payment has already been processed');
      }

      const wallet = await tx.mentorWallet.upsert({
        where: { mentorProfileId: payment.booking.mentorProfileId },
        create: { mentorProfileId: payment.booking.mentorProfileId },
        update: {},
      });
      await tx.mentorWallet.update({
        where: { id: wallet.id },
        data: { pendingBalance: { increment: mentorAmount } },
      });
      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          bookingId: payment.booking.id,
          type: 'EARNING',
          amount: mentorAmount,
          description: 'Session earning (net after 13% platform fee)',
          idempotencyKey: `payment-credit:${payment.booking.id}`,
          balanceBefore: wallet.pendingBalance,
          balanceAfter: wallet.pendingBalance + mentorAmount,
        },
      });
      return tx.payment.findUnique({ where: { id: payment.id } });
    }, { isolationLevel: 'Serializable' });

    // Fire-and-forget: send booking confirmation + payment receipt emails
    this._sendPaymentSuccessEmails(updatedPayment, payment.booking);

    return {
      message: 'Payment verified successfully',
      bookingId: payment.booking.id,
      paymentId: updatedPayment.id,
      paymentStatus: 'SUCCESS',
    };
  }

  /**
   * Fire-and-forget email notifications after a successful payment.
   * Fetches full participant details and sends:
   * - Booking confirmation to mentee
   * - New booking alert to mentor
   * - Payment receipt to mentee
   */
  async _sendPaymentSuccessEmails(payment, booking) {
    try {
      // Fetch full booking details with participants
      const fullBooking = await prisma.booking.findUnique({
        where: { id: booking.id },
        include: {
          mentee: { select: { id: true, name: true, email: true } },
          mentorProfile: {
            include: {
              user: { select: { name: true, email: true } },
            },
          },
          mentorService: {
            select: { title: true, durationMinutes: true, price: true },
          },
        },
      });

      if (!fullBooking) return;

      const menteeName = fullBooking.mentee?.name || 'Mentee';
      const menteeEmail = fullBooking.mentee?.email;
      const mentorName = fullBooking.mentorProfile?.user?.name || 'Mentor';
      const mentorEmail = fullBooking.mentorProfile?.user?.email;
      const serviceName = fullBooking.mentorService?.title || 'Mentoring Session';

      const emailData = {
        menteeName,
        menteeEmail,
        mentorName,
        mentorEmail,
        serviceName,
        startTime: fullBooking.startTime,
        endTime: fullBooking.endTime,
        amount: payment.amount,
        currency: payment.currency || 'INR',
        purposeOfCall: fullBooking.purposeOfCall,
        bookingId: fullBooking.id,
        paymentId: payment.id,
        paidAt: new Date(),
      };

      // Send all emails in parallel (fire-and-forget)
      await Promise.allSettled([
        // Booking confirmed → mentee
        menteeEmail && emailService.sendBookingConfirmedToMentee(emailData),
        // New booking alert → mentor
        mentorEmail && emailService.sendNewBookingToMentor(emailData),
        // Payment receipt → mentee
        menteeEmail && emailService.sendPaymentReceipt(emailData),
      ]);
    } catch (err) {
      console.error('[PaymentService] Failed to send payment success emails:', err.message);
    }
  }

  /**
   * Handle payment failure / dismissal — IMMEDIATELY release the slot.
   *
   * Marks the payment as FAILED and booking as CANCELLED so the slot
   * becomes available for other mentees instantly. No 10-minute hold.
   */
  async handlePaymentFailure(userId, payload) {
    const { razorpay_order_id, bookingId } = payload;

    if (!bookingId) {
      throw createServiceError(400, 'Missing booking ID');
    }

    const payment = await prisma.payment.findFirst({
      where: {
        booking: { id: bookingId, menteeId: userId },
      },
      include: {
        booking: { select: { id: true, status: true } },
      },
    });

    if (!payment) {
      throw createServiceError(404, 'Payment not found');
    }

    // If payment is already successful, don't touch it
    if (payment.paymentStatus === 'SUCCESS') {
      return { message: 'Payment already succeeded', bookingId };
    }

    // If booking is already cancelled, just acknowledge
    if (payment.booking.status === 'CANCELLED_BY_MENTOR' || payment.booking.status === 'CANCELLED_BY_MENTEE') {
      return { message: 'Booking already released', bookingId };
    }

    // Claim both pending records atomically. A browser dismissal must never
    // cancel a payment callback that has already confirmed the booking.
    const updatedBooking = await prisma.$transaction(async (tx) => {
      const bookingUpdate = await tx.booking.updateMany({
        where: { id: payment.booking.id, status: 'PAYMENT_PENDING' },
        data: { status: 'CANCELLED_BY_MENTEE' },
      });
      if (bookingUpdate.count !== 1) return null;

      const paymentUpdate = await tx.payment.updateMany({
        where: { id: payment.id, paymentStatus: 'PENDING' },
        data: { paymentStatus: 'FAILED' },
      });
      if (paymentUpdate.count !== 1) {
        throw createServiceError(409, 'Payment has already been processed');
      }

      return tx.booking.findUnique({
        where: { id: payment.booking.id },
        select: { mentorProfileId: true, mentorServiceId: true, startTime: true, endTime: true },
      });
    }, { isolationLevel: 'Serializable' });

    if (!updatedBooking) {
      return { message: 'Booking is no longer awaiting payment', bookingId };
    }

    emitSlotUpdate(updatedBooking.mentorProfileId, {
      startTime: utcToIst(updatedBooking.startTime),
      endTime: utcToIst(updatedBooking.endTime),
      serviceId: updatedBooking.mentorServiceId,
      action: 'released',
    });

    return { message: 'Payment failure recorded — slot released', bookingId };
  }
}

export default new PaymentService();
