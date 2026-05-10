import { Router } from 'express';
import paymentController from '../controllers/PaymentController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

// All payment routes require authentication
router.post('/create-order', authenticateJWT, paymentController.createOrder);
router.post('/verify', authenticateJWT, paymentController.verifyPayment);
router.post('/failure', authenticateJWT, paymentController.handleFailure);

export default router;
