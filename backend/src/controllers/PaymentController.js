import { ApiResponse } from '../utils/apiResponse.js';
import { ApiError } from '../utils/apiError.js';
import { PrismaClient } from '../generated/prisma/index.js';
import PaymentService from '../services/PaymentService.js';
import EmailService from '../services/EmailService.js';
import { 
  createPaymentOrderSchema, 
  verifyPaymentSchema, 
  handlePaymentFailureSchema 
} from '../validators/payment.validator.js';

const prisma = new PrismaClient();

class PaymentController {
  // Create a payment order (called after booking is created)
  async createPaymentOrder(req, res) {
    try {
      // Validate input using Zod
      const { bookingId } = createPaymentOrderSchema.parse(req.body);

      // Get booking with payment info
      const booking = await prisma.booking.findFirst({
        where: {
          id: bookingId,
          menteeId: req.user.id,
        },
        include: {
          payment: true,
          slot: {
            include: {
              mentor: true,
            },
          },
          mentor: {
            include: {
              mentorProfile: true,
            },
          },
        },
      });

      if (!booking) {
        return res.status(404).json(new ApiError(404, 'Booking not found'));
      }

      if (booking.payment && booking.payment.status === 'SUCCESS') {
        return res.status(400).json(new ApiError(400, 'Payment already completed'));
      }

      const amount = booking.mentor.mentorProfile?.pricePerSession || 0;

      // Create Razorpay order
      const order = await PaymentService.createOrder({
        amount,
        bookingId,
      });

      // Update or create payment record
      let payment;
      if (booking.payment) {
        payment = await prisma.payment.update({
          where: { id: booking.payment.id },
          data: {
            razorpayOrderId: order.orderId,
            amount,
            status: 'CREATED',
          },
        });
      } else {
        payment = await prisma.payment.create({
          data: {
            bookingId,
            razorpayOrderId: order.orderId,
            amount,
            currency: 'INR',
            status: 'CREATED',
          },
        });
      }

      res.status(200).json(
        new ApiResponse(true, 'Payment order created', {
          orderId: order.orderId,
          amount: order.amount,
          currency: order.currency,
          bookingId,
          keyId: process.env.RAZORPAY_KEY_ID,
        })
      );
    } catch (error) {
      console.error('Create payment order error:', error);
      res.status(500).json(
        new ApiError(500, 'Failed to create payment order', error.message)
      );
    }
  }

  // Verify and process payment
  async verifyPayment(req, res) {
    try {
      // Validate input using Zod
      const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = verifyPaymentSchema.parse(req.body);

      // Process payment
      const payment = await PaymentService.processPayment({
        bookingId,
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      });

      const booking = payment.booking;
      const slotDate = new Date(booking.slot.startTime).toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      const slotTime = new Date(booking.slot.startTime).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      });

      // Send email notifications
      await Promise.all([
        // Email to mentee
        EmailService.sendBookingConfirmationToMentee({
          menteeEmail: booking.mentee.email,
          menteeName: booking.mentee.name || 'User',
          mentorName: booking.mentor.name || 'Mentor',
          slotDate,
          slotTime,
          bookingId: booking.id,
        }),
        // Email to mentor
        EmailService.sendBookingNotificationToMentor({
          mentorEmail: booking.mentor.email,
          mentorName: booking.mentor.name || 'Mentor',
          menteeName: booking.mentee.name || 'User',
          slotDate,
          slotTime,
          bookingId: booking.id,
          purpose: booking.purpose,
          shareProfile: booking.shareProfile,
        }),
        // Payment confirmation to mentee
        EmailService.sendPaymentConfirmation({
          email: booking.mentee.email,
          name: booking.mentee.name || 'User',
          amount: payment.amount,
          bookingId: booking.id,
          paymentId: razorpayPaymentId,
        }),
      ]);

      res.status(200).json(
        new ApiResponse(true, 'Payment verified successfully', {
          bookingId: booking.id,
          paymentId: razorpayPaymentId,
          status: 'CONFIRMED',
        })
      );
    } catch (error) {
      console.error('Verify payment error:', error);
      res.status(400).json(
        new ApiError(400, 'Payment verification failed', error.message)
      );
    }
  }

  // Handle payment failure
  async handlePaymentFailure(req, res) {
    try {
      // Validate input using Zod
      const { razorpayOrderId } = handlePaymentFailureSchema.parse(req.body);

      const payment = await PaymentService.handlePaymentFailure({ razorpayOrderId });

      res.status(200).json(
        new ApiResponse(true, 'Payment failure handled', {
          bookingId: payment.booking.id,
          status: 'CANCELLED',
        })
      );
    } catch (error) {
      console.error('Handle payment failure error:', error);
      res.status(500).json(
        new ApiError(500, 'Failed to handle payment failure', error.message)
      );
    }
  }

  // Get payment details
  async getPaymentDetails(req, res) {
    try {
      const { bookingId } = req.params;

      const payment = await prisma.payment.findFirst({
        where: {
          bookingId,
          booking: {
            OR: [
              { menteeId: req.user.id },
              { mentorId: req.user.id },
            ],
          },
        },
        include: {
          booking: {
            include: {
              mentor: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
              slot: true,
            },
          },
        },
      });

      if (!payment) {
        return res.status(404).json(new ApiError(404, 'Payment not found'));
      }

      res.status(200).json(
        new ApiResponse(true, 'Payment details retrieved', payment)
      );
    } catch (error) {
      console.error('Get payment details error:', error);
      res.status(500).json(
        new ApiError(500, 'Failed to get payment details', error.message)
      );
    }
  }
}

export default new PaymentController();
