import { prisma } from '../config/database.js';
import { razorpayInstance } from '../config/razorpay.js';
import crypto from 'crypto';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class PaymentService {
  /**
   * Create a Razorpay order for a booking.
   * Called after a booking is created with status PENDING.
   *
   * Flow:
   * 1. Look up the booking and its payment record.
   * 2. Create a Razorpay order via the SDK.
   * 3. Save the razorpayOrderId on the Payment record.
   * 4. Return the order details for the frontend to open the Razorpay checkout.
   */
  async createOrder(userId, bookingId) {
    // 1. Find the booking + payment
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        payment: true,
        mentee: { select: { id: true, name: true, email: true } },
        mentorProfile: {
          include: { user: { select: { name: true } } },
        },
        mentorService: {
          select: { serviceType: true, pricePerSession: true },
        },
      },
    });

    if (!booking) {
      throw createServiceError(404, 'Booking not found');
    }

    // Verify the user is the mentee for this booking
    if (booking.menteeId !== userId) {
      throw createServiceError(403, 'You are not authorized to pay for this booking');
    }

    if (!booking.payment) {
      throw createServiceError(400, 'No payment record found for this booking');
    }

    if (booking.payment.paymentStatus === 'SUCCESS') {
      throw createServiceError(400, 'Payment has already been completed');
    }

    if (booking.bookingStatus === 'CANCELLED') {
      throw createServiceError(400, 'Cannot pay for a cancelled booking');
    }

    // If there's already a Razorpay order, return it (idempotent)
    if (booking.payment.razorpayOrderId) {
      try {
        const existingOrder = await razorpayInstance.orders.fetch(
          booking.payment.razorpayOrderId
        );
        if (existingOrder.status !== 'paid') {
          return {
            orderId: existingOrder.id,
            amount: existingOrder.amount,
            currency: existingOrder.currency,
            bookingId: booking.id,
            keyId: process.env.RAZORPAY_KEY_ID,
            prefill: {
              name: booking.mentee.name,
              email: booking.mentee.email,
            },
          };
        }
      } catch {
        // If the existing order is invalid/expired, create a new one
      }
    }

    // 2. Create Razorpay order
    const amountInPaise = Math.round(booking.payment.amount * 100);

    const order = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: booking.payment.currency || 'INR',
      receipt: `booking_${booking.id.substring(0, 8)}`,
      notes: {
        bookingId: booking.id,
        menteeId: booking.menteeId,
        mentorName: booking.mentorProfile?.user?.name || '',
        serviceType: booking.mentorService?.serviceType || '',
      },
    });

    // 3. Save Razorpay order ID on the payment record
    await prisma.payment.update({
      where: { id: booking.payment.id },
      data: { razorpayOrderId: order.id },
    });

    return {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      bookingId: booking.id,
      keyId: process.env.RAZORPAY_KEY_ID,
      prefill: {
        name: booking.mentee.name,
        email: booking.mentee.email,
      },
    };
  }

  /**
   * Verify and confirm a Razorpay payment.
   *
   * Flow:
   * 1. Verify the signature using HMAC SHA256.
   * 2. Update the Payment record (razorpayPaymentId, razorpaySignature, status).
   * 3. Update the Booking status to CONFIRMED.
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
          select: { id: true, menteeId: true, bookingStatus: true },
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
      // Mark payment as failed
      await prisma.payment.update({
        where: { id: payment.id },
        data: { paymentStatus: 'FAILED' },
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
        data: { bookingStatus: 'CONFIRMED' },
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
   * Handle payment failure — mark payment as FAILED.
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
    });

    if (!payment) {
      throw createServiceError(404, 'Payment not found');
    }

    await prisma.payment.update({
      where: { id: payment.id },
      data: { paymentStatus: 'FAILED' },
    });

    return { message: 'Payment failure recorded', bookingId };
  }
}

export default new PaymentService();
