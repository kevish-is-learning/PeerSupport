import { Router } from 'express';
import bookingController from '../controllers/BookingController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// ─── Public / Authenticated ──────────────────────────────────────────────────

// GET /api/bookings/mentors/:mentorId/available-slots?serviceType=X&date=YYYY-MM-DD
// This is public (mentees browsing) but authentication is recommended
router.get(
  '/mentors/:mentorId/available-slots',
  authenticateJWT,
  bookingController.getAvailableSlots
);

// ─── Mentee Booking Actions ──────────────────────────────────────────────────

// POST /api/bookings — create a new booking (mentee only)
router.post(
  '/',
  authenticateJWT,
  authorizeRoles('MENTEE'),
  bookingController.initiateBooking
);

// GET /api/bookings/:bookingId — get a single booking (mentee or mentor)
router.get(
  '/:bookingId',
  authenticateJWT,
  bookingController.getBooking
);

// POST /api/bookings/:bookingId/cancel — cancel a booking (mentee or mentor)
router.post(
  '/:bookingId/cancel',
  authenticateJWT,
  bookingController.cancelBooking
);

export default router;
