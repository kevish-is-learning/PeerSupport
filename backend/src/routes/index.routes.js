import { Router } from 'express';

import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import menteeProfileRoutes from './menteeProfile.routes.js';
import mentorProfileRoutes from './mentorProfile.routes.js';
import mentorServiceRoutes from './mentorService.routes.js';
import mentorAvailabilityRoutes from './mentorAvailability.routes.js';
import mentorBookingRoutes from './mentorBooking.routes.js';
import menteeDashboardRoutes from './menteeDashboard.routes.js';
import menteeBookingRoutes from './menteeBooking.routes.js';
import publicMentorRoutes from './publicMentor.routes.js';
import publicMenteeRoutes from './publicMentee.routes.js';
import bookingRoutes from './booking.routes.js';
import paymentRoutes from './payment.routes.js';
import meetingRoutes from './meeting.routes.js';
import walletRoutes from './wallet.routes.js';
import payoutRoutes from './payout.routes.js';
import cancellationRoutes from './cancellation.routes.js';

// V2 routes — new booking & availability system
import v2MentorRoutes from './v2/mentor.routes.js';
import v2BookingRoutes from './v2/booking.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Peer Support API',
    version: '1.0.0',
  });
});
// Health check
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Peer Support API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Mount route groups
router.use('/auth', authRoutes);
router.use('/mentee-profile', menteeProfileRoutes);
router.use('/mentee-dashboard', menteeDashboardRoutes);
router.use('/mentee-bookings', menteeBookingRoutes);
router.use('/mentor-profile', mentorProfileRoutes);
router.use('/mentor-services', mentorServiceRoutes);
router.use('/mentor-availability', mentorAvailabilityRoutes);
router.use('/mentor-bookings', mentorBookingRoutes);
router.use('/mentors', publicMentorRoutes);
router.use('/mentees', publicMenteeRoutes);
router.use('/admin', adminRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/meetings', meetingRoutes);
router.use('/wallet', walletRoutes);
router.use('/payouts', payoutRoutes);
router.use('/cancellations', cancellationRoutes);

// ─── V2 Routes ─────────────────────────────────────────────────────────────
router.use('/v2', v2MentorRoutes);
router.use('/v2', v2BookingRoutes);

export default router;

