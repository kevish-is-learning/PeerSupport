import { Router } from 'express';

import authRoutes from './auth.routes.js';

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

export default router;
