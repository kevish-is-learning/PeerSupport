/**
 * Notification Controller
 * Pattern: Controller / Delegate to Service
 */

import BaseController from './BaseController.js';
import notificationService from '../services/NotificationService.js';

class NotificationController extends BaseController {
  constructor() {
    super(notificationService);
  }

  /**
   * GET /api/notifications
   */
  getAll = BaseController.asyncHandler(async (req, res) => {
    const { data, meta } = await this.service.getUserNotifications(req.user.id, req.query);
    this.success(res, data, 'Notifications retrieved', 200, meta);
  });

  /**
   * GET /api/notifications/unread-count
   */
  getUnreadCount = BaseController.asyncHandler(async (req, res) => {
    const count = await this.service.getUnreadCount(req.user.id);
    this.success(res, { count });
  });

  /**
   * PUT /api/notifications/:id/read
   */
  markAsRead = BaseController.asyncHandler(async (req, res) => {
    await this.service.markAsRead(req.params.id, req.user.id);
    this.success(res, null, 'Notification marked as read');
  });

  /**
   * PUT /api/notifications/read-all
   */
  markAllAsRead = BaseController.asyncHandler(async (req, res) => {
    await this.service.markAllAsRead(req.user.id);
    this.success(res, null, 'All notifications marked as read');
  });
}

export default new NotificationController();
