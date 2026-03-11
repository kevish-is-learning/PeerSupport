import { Router } from 'express';

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import menteeRoutes from './mentee.routes.js';
import mentorRoutes from './mentor.routes.js';
import paymentRoutes from './payment.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Authentication API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        googleAuth: 'GET /api/auth/google',
        changePassword: 'POST /api/auth/change-password',
        logout: 'POST /api/auth/logout',
      },
      mentor: {
        canAcceptBookings: 'GET /api/mentor/can-accept-bookings',
        dashboard: 'GET /api/mentor/dashboard',
        slots: 'GET/POST/PATCH/DELETE /api/mentor/slots',
        bookings: 'GET /api/mentor/bookings',
        rescheduleBooking: 'PATCH /api/mentor/bookings/:id/reschedule',
        cancelBooking: 'PATCH /api/mentor/bookings/:id/cancel',
        completeBooking: 'PATCH /api/mentor/bookings/:id/complete',
        earnings: 'GET /api/mentor/earnings',
        transactions: 'GET /api/mentor/transactions',
        withdrawals: 'GET/POST /api/mentor/withdrawals',
        ratings: 'GET /api/mentor/ratings',
        resumes: 'GET/POST/DELETE /api/mentor/resumes',
      },
      mentee: {
        dashboard: 'GET /api/mentee/dashboard/stats',
        mentors: 'GET /api/mentee/mentors',
        mentorById: 'GET /api/mentee/mentors/:id',
        bookings: 'GET/POST /api/mentee/bookings',
        cancelBooking: 'PATCH /api/mentee/bookings/:id/cancel',
        submitReview: 'POST /api/mentee/bookings/:id/review',
        webinars: 'GET /api/mentee/webinars',
        registerWebinar: 'POST /api/mentee/webinars/:id/register',
        notifications: 'GET /api/mentee/notifications',
      },
      users: {
        getCurrentUser: 'GET /api/users/me',
        updateCurrentUser: 'PUT /api/users/me',
        deleteCurrentUser: 'DELETE /api/users/me',
        checkEmail: 'GET /api/users/check-email?email=',
        // Profile Management (Role-based)
        menteeProfile: 'GET/POST/PUT/DELETE /api/users/profile/mentee',
        mentorProfile: 'GET/POST/PUT/DELETE /api/users/profile/mentor',
        adminProfile: 'GET/POST/PUT/DELETE /api/users/profile/admin (admin)',
        // Mentee Resumes
        resumes: 'GET/POST/DELETE /api/users/resumes (mentee)',
        // Mentor Applications
        submitApplication: 'POST /api/users/mentor-applications',
        updateApplication: 'PUT /api/users/mentor-applications',
        getMyApplication: 'GET /api/users/mentor-applications/my',
        getAllApplications: 'GET /api/users/mentor-applications (admin)',
        getApplicationById: 'GET /api/users/mentor-applications/:id (admin)',
        approveApplication: 'PATCH /api/users/mentor-applications/:id/approve (admin)',
        rejectApplication: 'PATCH /api/users/mentor-applications/:id/reject (admin)',
        // Admin User Management
        getAllUsers: 'GET /api/users (admin)',
        getUsersByRole: 'GET /api/users/role/:role (admin)',
        createUser: 'POST /api/users (admin)',
        getUserById: 'GET /api/users/:id (admin)',
        updateUser: 'PUT /api/users/:id (admin)',
        updateRole: 'PATCH /api/users/:id/role (admin)',
        toggleStatus: 'PATCH /api/users/:id/status (admin)',
        verifyUser: 'PATCH /api/users/:id/verify (admin)',
        deleteUser: 'DELETE /api/users/:id (admin)',
        permanentDelete: 'DELETE /api/users/:id/permanent (admin)',
        restoreUser: 'PATCH /api/users/:id/restore (admin)',
      },
    },
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
router.use('/users', userRoutes);
router.use('/mentee', menteeRoutes);
router.use('/mentor', mentorRoutes);
router.use('/payments', paymentRoutes);

export default router;
