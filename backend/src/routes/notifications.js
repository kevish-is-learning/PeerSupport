/**
 * Notification Routes
 */

import { Router } from 'express';
import notificationController from '../controllers/NotificationController.js';
import AuthMiddleware from '../middleware/auth.js';

const router = Router();

// All notification routes require authentication
router.use(AuthMiddleware.authenticate);

router.get('/', notificationController.getAll);
router.get('/unread-count', notificationController.getUnreadCount);
router.put('/:id/read', notificationController.markAsRead);
router.put('/read-all', notificationController.markAllAsRead);

export default router;
