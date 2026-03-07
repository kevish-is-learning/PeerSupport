import { z } from 'zod';

// Payment status enum
const PaymentStatusEnum = z.enum(['CREATED', 'SUCCESS', 'FAILED'], {
  errorMap: () => ({ message: 'Invalid payment status' }),
});

// Create payment order schema
export const createPaymentOrderSchema = z.object({
  bookingId: z.string({ required_error: 'Booking ID is required' }),
});

// Verify payment schema
export const verifyPaymentSchema = z.object({
  bookingId: z.string({ required_error: 'Booking ID is required' }),
  razorpayOrderId: z.string({ required_error: 'Razorpay Order ID is required' }),
  razorpayPaymentId: z.string({ required_error: 'Razorpay Payment ID is required' }),
  razorpaySignature: z.string({ required_error: 'Razorpay Signature is required' }),
});

// Handle payment failure schema
export const handlePaymentFailureSchema = z.object({
  razorpayOrderId: z.string({ required_error: 'Razorpay Order ID is required' }),
});

// Create order (internal) schema
export const createOrderSchema = z.object({
  amount: z.number({ required_error: 'Amount is required' }).positive('Amount must be positive'),
  bookingId: z.string({ required_error: 'Booking ID is required' }),
  currency: z.string().optional().default('INR'),
});

// Process payment schema
export const processPaymentSchema = z.object({
  bookingId: z.string({ required_error: 'Booking ID is required' }),
  razorpayOrderId: z.string({ required_error: 'Razorpay Order ID is required' }),
  razorpayPaymentId: z.string({ required_error: 'Razorpay Payment ID is required' }),
  razorpaySignature: z.string({ required_error: 'Razorpay Signature is required' }),
});

// Validate function helper
export const validatePayment = {
  createPaymentOrder: (data) => createPaymentOrderSchema.parse(data),
  verifyPayment: (data) => verifyPaymentSchema.parse(data),
  handlePaymentFailure: (data) => handlePaymentFailureSchema.parse(data),
  createOrder: (data) => createOrderSchema.parse(data),
  processPayment: (data) => processPaymentSchema.parse(data),
};

export default {
  createPaymentOrderSchema,
  verifyPaymentSchema,
  handlePaymentFailureSchema,
  createOrderSchema,
  processPaymentSchema,
  validatePayment,
  PaymentStatusEnum,
};
