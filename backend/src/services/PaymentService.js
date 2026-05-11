import { prisma } from '../config/database.js';
import { razorpayInstance } from '../config/razorpay.js';
import { emitSlotUpdate } from '../config/socket.js';
import { utcToIst } from '../utils/timezoneUtils.js';
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
          select: { id: true, menteeId: true, status: true },
        },
      },
    });

    if (!payment) {
      throw createServiceError(404, 'Payment not found for this order');
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

    if (generatedSignature !== razorpay_signature) {
      // Signature invalid → mark payment FAILED and cancel booking immediately
      const [, updatedBooking] = await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: { paymentStatus: 'FAILED' },
        }),
        prisma.booking.update({
          where: { id: payment.booking.id },
          data: { status: 'CANCELLED' },
          select: {
            mentorProfileId: true,
            mentorServiceId: true,
            startTime: true,
            endTime: true,
          },
        }),
      ]);

      emitSlotUpdate(updatedBooking.mentorProfileId, {
        startTime: utcToIst(updatedBooking.startTime),
        endTime: utcToIst(updatedBooking.endTime),
        serviceId: updatedBooking.mentorServiceId,
        action: 'released',
      });
      throw createServiceError(400, 'Payment verification failed — invalid signature');
    }

    // 3. Update payment and booking in a transaction
    const [updatedPayment] = await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          paymentStatus: 'SUCCESS',
          paidAt: new Date(),
        },
      }),
      prisma.booking.update({
        where: { id: payment.booking.id },
        data: { status: 'CONFIRMED' },
      }),
    ]);

    return {
      message: 'Payment verified successfully',
      bookingId: payment.booking.id,
      paymentId: updatedPayment.id,
      paymentStatus: 'SUCCESS',
    };
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
    if (payment.booking.status === 'CANCELLED') {
      return { message: 'Booking already released', bookingId };
    }

    // Mark payment as FAILED and booking as CANCELLED → instant slot release
    const [, updatedBooking] = await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: { paymentStatus: 'FAILED' },
      }),
      prisma.booking.update({
        where: { id: payment.booking.id },
        data: { status: 'CANCELLED' },
        select: {
          mentorProfileId: true,
          mentorServiceId: true,
          startTime: true,
          endTime: true,
        },
      }),
    ]);

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
