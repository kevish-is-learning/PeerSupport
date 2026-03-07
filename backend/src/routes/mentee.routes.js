import express from 'express';
import menteeController from '../controllers/MenteeController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication and MENTEE role
router.use(authenticateJWT);
router.use(authorizeRoles('MENTEE', 'ADMIN'));

// Dashboard
router.get('/dashboard/stats', menteeController.getDashboardStats);

// Mentors
router.get('/mentors', menteeController.getAllMentors);
router.get('/mentors/:mentorId', menteeController.getMentorById);
router.get('/mentors/:mentorId/slots', menteeController.getMentorSlots);
router.get('/mentors/:mentorId/reviews', menteeController.getMentorReviews); 

// Bookings
router.get('/bookings', menteeController.getMyBookings);
router.get('/bookings/:bookingId', menteeController.getBookingById);
router.post('/bookings', menteeController.createBooking);
router.patch('/bookings/:bookingId/cancel', menteeController.cancelBooking);

// Reviews
router.post('/bookings/:bookingId/review', menteeController.submitReview);

// Webinars
router.get('/webinars', menteeController.getAllWebinars);
router.post('/webinars/:webinarId/register', menteeController.registerForWebinar);
router.get('/webinars/registrations/my', menteeController.getMyWebinarRegistrations);

// Notifications
router.get('/notifications', menteeController.getNotifications);
router.patch('/notifications/:notificationId/read', menteeController.markNotificationAsRead);
router.patch('/notifications/read-all', menteeController.markAllNotificationsAsRead);

export default router;
