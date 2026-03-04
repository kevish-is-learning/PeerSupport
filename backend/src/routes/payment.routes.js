import express from 'express';
import paymentController from '../controllers/PaymentController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticateJWT);

// Create payment order
router.post('/create-order', paymentController.createPaymentOrder);

// Verify payment after Razorpay callback
router.post('/verify', paymentController.verifyPayment);

// Handle payment failure
router.post('/failure', paymentController.handlePaymentFailure);

// Get payment details for a booking
router.get('/booking/:bookingId', paymentController.getPaymentDetails);

export default router;
