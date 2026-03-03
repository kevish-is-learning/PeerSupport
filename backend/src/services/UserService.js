/**
 * User Service
 * Handles user profile operations.
 * Pattern: Service Layer
 */

import BaseService from './BaseService.js';
import { NotFoundError } from '../errors/index.js';
import Helpers from '../utils/helpers.js';
import logger from '../utils/logger.js';

class UserService extends BaseService {
  constructor() {
    super('user');
  }

  /**
   * Gets a user profile by ID.
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async getProfile(userId) {
    const user = await this.findById(userId, {
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        bio: true,
        avatar: true,
        role: true,
        reputation: true,
        createdAt: true,
        _count: { select: { posts: true, comments: true } },
      },
    });

    if (!user) throw new NotFoundError('User');
    return user;
  }

  /**
   * Updates a user profile.
   * @param {string} userId
   * @param {object} data - { displayName, bio, avatar }
   * @returns {Promise<object>}
   */
  async updateProfile(userId, data) {
    const user = await this.update(userId, data, {
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        bio: true,
        avatar: true,
        role: true,
        reputation: true,
      },
    });

    logger.info(`Profile updated for user: ${userId}`);
    return user;
  }

  /**
   * Gets all users (admin only, paginated).
   * @param {object} query
   * @returns {Promise<{ data: object[], meta: object }>}
   */
  async getUsers(query) {
    const { page, limit, skip } = Helpers.parsePagination(query);
    const where = {};

    if (query.search) {
      where.OR = [
        { username: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { displayName: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.role) where.role = query.role;
    if (query.isActive !== undefined) where.isActive = query.isActive === 'true';

    const { data, total } = await this.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: { select: { posts: true, comments: true } },
      },
    });

    return {
      data: data.map(Helpers.sanitizeUser),
      meta: Helpers.paginationMeta(page, limit, total),
    };
  }
}

export default new UserService();
