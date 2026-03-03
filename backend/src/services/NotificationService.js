/**
 * Notification Service
 * Handles creating, fetching, and real-time delivery of notifications.
 * Pattern: Observer / Service Layer
 */

import BaseService from './BaseService.js';
import logger from '../utils/logger.js';
import Helpers from '../utils/helpers.js';

class NotificationService extends BaseService {
  #io = null;

  constructor() {
    super('notification');
  }

  /**
   * Attach the Socket.IO server instance.
   * @param {import('socket.io').Server} io
   */
  setSocketIO(io) {
    this.#io = io;
  }

  /**
   * Creates a notification and emits it in real-time.
   * @param {{ userId: string, type: string, title: string, message: string, resourceId?: string, resourceType?: string }} data
   * @returns {Promise<object>}
   */
  async notify({ userId, type, title, message, resourceId, resourceType }) {
    const notification = await this.create({
      userId,
      type,
      title,
      message,
      resourceId,
      resourceType,
    });

    // Real-time emit
    if (this.#io) {
      this.#io.to(`user:${userId}`).emit('notification', notification);
    }

    return notification;
  }

  /**
   * Gets paginated notifications for a user.
   * @param {string} userId
   * @param {object} query - { page, limit }
   * @returns {Promise<{ data: object[], meta: object }>}
   */
  async getUserNotifications(userId, query) {
    const { page, limit, skip } = Helpers.parsePagination(query);

    const { data, total } = await this.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return { data, meta: Helpers.paginationMeta(page, limit, total) };
  }

  /**
   * Marks a notification as read.
   * @param {string} notificationId
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async markAsRead(notificationId, userId) {
    return this.model.updateMany({
      where: { id: notificationId, userId },
      data: { isRead: true, readAt: new Date() },
    });
  }

  /**
   * Marks all notifications as read for a user.
   * @param {string} userId
   */
  async markAllAsRead(userId) {
    return this.model.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
  }

  /**
   * Gets unread notification count for a user.
   * @param {string} userId
   * @returns {Promise<number>}
   */
  async getUnreadCount(userId) {
    return this.count({ userId, isRead: false });
  }
}

export default new NotificationService();
