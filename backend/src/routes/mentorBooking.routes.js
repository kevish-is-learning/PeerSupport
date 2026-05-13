import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import mentorBookingController from '../controllers/MentorBookingController.js';

const router = Router();

router.use(authenticateJWT, authorizeRoles('MENTOR'));

// GET /api/mentor-bookings/dashboard  – stats cards
router.get('/dashboard', (req, res) => mentorBookingController.getDashboardStats(req, res));

// GET /api/mentor-bookings/mentees    – list of distinct mentees
router.get('/mentees',authenticateJWT, (req, res) => mentorBookingController.listMentees(req, res));

// GET /api/mentor-bookings/mentees/:menteeId  – sessions with a specific mentee
router.get('/mentees/:menteeId', (req, res) =>
  mentorBookingController.listBookingsForMentee(req, res)
);

// GET /api/mentor-bookings/earnings   – earnings + transaction history
router.get('/earnings', (req, res) => mentorBookingController.getEarnings(req, res));

export default router;
