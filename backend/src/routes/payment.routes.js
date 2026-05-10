import { Router } from 'express';
import paymentController from '../controllers/PaymentController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

// All payment routes require authentication
// NOTE: /create-order is removed — order creation is now part of POST /api/bookings (initiateBooking)
router.post('/verify', authenticateJWT, paymentController.verifyPayment);
router.post('/failure', authenticateJWT, paymentController.handleFailure);

export default router;
