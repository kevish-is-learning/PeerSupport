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
        apply: 'POST /api/mentor/apply',
        updateApplication: 'PUT /api/mentor/apply',
        getApplication: 'GET /api/mentor/application/my',
        profile: 'GET /api/mentor/profile',
        updateProfile: 'PUT /api/mentor/profile',
        dashboard: 'GET /api/mentor/dashboard',
        slots: 'GET/POST /api/mentor/slots',
        bookings: 'GET /api/mentor/bookings',
        earnings: 'GET /api/mentor/earnings',
        withdrawals: 'GET/POST /api/mentor/withdrawals',
        incentives: 'GET /api/mentor/incentives',
        ratings: 'GET /api/mentor/ratings',
      },
      users: {
        getCurrentUser: 'GET /api/users/me',
        updateCurrentUser: 'PUT /api/users/me',
        checkEmail: 'GET /api/users/check-email?email=',
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
