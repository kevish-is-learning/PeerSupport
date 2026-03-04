import Razorpay from 'razorpay';
import crypto from 'crypto';
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

class PaymentService {
  constructor() {
    this.razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }

  async createOrder({ amount, bookingId, currency = 'INR' }) {
    try {
      const options = {
        amount: Math.round(amount * 100), // Razorpay expects amount in paise
        currency,
        receipt: `booking_${bookingId}`,
        notes: {
          bookingId,
        },
      };

      const order = await this.razorpay.orders.create(options);
      
      return {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
      };
    } catch (error) {
      console.error('Razorpay order creation failed:', error);
      throw new Error('Failed to create payment order');
    }
  }

  verifyPaymentSignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    return expectedSignature === razorpaySignature;
  }

  async processPayment({ bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature }) {
    // Verify signature
    const isValid = this.verifyPaymentSignature({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!isValid) {
      throw new Error('Invalid payment signature');
    }

    // Update payment record
    const payment = await prisma.payment.update({
      where: { razorpayOrderId },
      data: {
        razorpayPaymentId,
        status: 'SUCCESS',
      },
      include: {
        booking: {
          include: {
            mentor: {
              include: {
                mentorProfile: true,
              },
            },
            mentee: true,
            slot: true,
          },
        },
      },
    });

    // Update booking status to CONFIRMED
    await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'CONFIRMED' },
    });

    // Create earnings record for mentor
    if (payment.booking.mentor.mentorProfile) {
      await prisma.earnings.create({
        data: {
          mentorId: payment.booking.mentor.mentorProfile.id,
          bookingId,
          amount: payment.amount * 0.8, // 80% to mentor
        },
      });
    }

    return payment;
  }

  async handlePaymentFailure({ razorpayOrderId }) {
    const payment = await prisma.payment.update({
      where: { razorpayOrderId },
      data: { status: 'FAILED' },
      include: {
        booking: true,
      },
    });

    // Free up the slot
    await prisma.slot.update({
      where: { id: payment.booking.slotId },
      data: { status: 'AVAILABLE' },
    });

    // Update booking status
    await prisma.booking.update({
      where: { id: payment.booking.id },
      data: { status: 'CANCELLED' },
    });

    return payment;
  }

  async getPaymentByOrderId(razorpayOrderId) {
    return prisma.payment.findUnique({
      where: { razorpayOrderId },
      include: {
        booking: {
          include: {
            mentor: true,
            mentee: true,
            slot: true,
          },
        },
      },
    });
  }
}

export default new PaymentService();
