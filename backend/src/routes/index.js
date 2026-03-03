/**
 * Route Index
 * Aggregates all route modules under /api prefix.
 */

import { Router } from 'express';

import authRoutes from './auth.js';
import postRoutes from './posts.js';
import commentRoutes from './comments.js';
import userRoutes from './users.js';
import notificationRoutes from './notifications.js';
import adminRoutes from './admin.js';

const router = Router();

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
router.use('/posts', postRoutes);
router.use('/', commentRoutes); // comment routes include /posts/:postId/comments and /comments/:id
router.use('/users', userRoutes);
router.use('/notifications', notificationRoutes);
router.use('/admin', adminRoutes);

export default router;
