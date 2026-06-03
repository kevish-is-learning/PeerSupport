import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import cancellationController from '../controllers/CancellationController.js';

const router = Router();

// POST /api/cancellations/:id — Cancel a booking (mentor or mentee)
router.post(
  '/:id',
  authenticateJWT,
  (req, res, next) => cancellationController.cancelBooking(req, res, next)
);

export default router;
