import { Router } from 'express';

import authRoutes from './auth.routes.js';
import menteeProfileRoutes from './menteeProfile.routes.js';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Auth API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        googleAuth: 'GET /api/auth/google',
        googleCallback: 'GET /api/auth/google/callback',
        changePassword: 'POST /api/auth/change-password',
        logout: 'POST /api/auth/logout',
      },
      menteeProfile: {
        get: 'GET /api/mentee-profile',
        create: 'POST /api/mentee-profile',
        update: 'PUT /api/mentee-profile',
        delete: 'DELETE /api/mentee-profile',
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
router.use('/mentee-profile', menteeProfileRoutes);

export default router;
