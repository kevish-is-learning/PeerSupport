import { Router } from 'express';

import authRoutes from './auth.routes.js';
import adminMentorRoutes from './adminMentor.routes.js';
import menteeProfileRoutes from './menteeProfile.routes.js';
import mentorProfileRoutes from './mentorProfile.routes.js';
import mentorServiceRoutes from './mentorService.routes.js';
import mentorAvailabilityRoutes from './mentorAvailability.routes.js';
import mentorBookingRoutes from './mentorBooking.routes.js';

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
router.use('/mentor-profile', mentorProfileRoutes);
router.use('/mentor-services', mentorServiceRoutes);
router.use('/mentor-availability', mentorAvailabilityRoutes);
router.use('/mentor-bookings', mentorBookingRoutes);
router.use('/admin', adminMentorRoutes);

export default router;
