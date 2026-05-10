import { Router } from 'express';
import bookingController from '../controllers/BookingController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.use(authenticateJWT, authorizeRoles('MENTEE'));

// GET /api/mentee-bookings/my-sessions — get mentee's upcoming + past sessions
router.get('/my-sessions', bookingController.getMySessions);

export default router;
