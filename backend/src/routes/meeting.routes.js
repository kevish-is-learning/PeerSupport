import { Router } from 'express';
import MeetingController from '../controllers/MeetingController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = Router();

// All meeting routes require authentication
router.use(authenticateJWT);

// GET /api/meetings/:bookingId/token — get Agora RTC token
router.get('/:bookingId/token', MeetingController.getToken);

// PATCH /api/meetings/:bookingId/finish — signal participant finished
router.patch('/:bookingId/finish', MeetingController.finish);

export default router;
