/**
 * V2 Booking Routes
 *
 * All routes are prefixed with /api/v2
 *
 * GET   /mentors/:id/slots?serviceId=&date=  — generate available slots (auth)
 * POST  /bookings                            — create a booking (auth + MENTEE)
 * GET   /bookings/:id                        — get a booking (auth)
 * PATCH /bookings/:id/cancel                 — cancel a booking (auth + MENTOR)
 * PATCH /bookings/:id/reschedule             — reschedule a booking (auth)
 */

import { Router } from 'express';
import bookingController from '../../controllers/v2/BookingController.js';
import { authenticateJWT, authorizeRoles } from '../../middleware/auth.js';

const router = Router();

// ─── Slot Generation (authenticated — mentees browsing) ──────────────────────

router.get(
  '/mentors/:id/slots',
  authenticateJWT,
  bookingController.getSlots
);

// ─── Booking CRUD ────────────────────────────────────────────────────────────

// Create booking (mentee only)
router.post(
  '/bookings',
  authenticateJWT,
  authorizeRoles('MENTEE'),
  bookingController.createBooking
);

// Get a booking (mentee or mentor)
router.get(
  '/bookings/:id',
  authenticateJWT,
  bookingController.getBooking
);

// Cancel booking (mentor only per spec)
router.patch(
  '/bookings/:id/cancel',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  bookingController.cancelBooking
);

// Reschedule booking (mentee or mentor)
router.patch(
  '/bookings/:id/reschedule',
  authenticateJWT,
  bookingController.rescheduleBooking
);

export default router;
