/**
 * Moderation Service
 * Handles content reporting, review, and user moderation actions.
 * Pattern: Service Layer / Strategy
 */

import BaseService from './BaseService.js';
import { NotFoundError, BadRequestError } from '../errors/index.js';
import { REPORT_STATUS } from '../utils/constants.js';
import logger from '../utils/logger.js';
import Helpers from '../utils/helpers.js';
import { Database } from '../config/database.js';

class ModerationService extends BaseService {
  constructor() {
    super('report');
  }

  /**
   * Creates a content report.
   * @param {{ reporterId: string, targetId: string, targetType: string, reason: string, description?: string }} data
   * @returns {Promise<object>}
   */
  async createReport({ reporterId, targetId, targetType, reason, description }) {
    // Prevent duplicate reports
    const existing = await this.findOne({
      reporterId,
      targetId,
      targetType,
      status: { in: [REPORT_STATUS.PENDING, REPORT_STATUS.REVIEWING] },
    });

    if (existing) {
      throw new BadRequestError('You have already reported this content');
    }

    const report = await this.create({
      reporterId,
      targetId,
      targetType,
      reason,
      description,
    });

    logger.info(`Report created: ${report.id} for ${targetType}:${targetId}`);
    return report;
  }

  /**
   * Gets all pending reports (for moderators).
   * @param {object} query - { page, limit, status }
   * @returns {Promise<{ data: object[], meta: object }>}
   */
  async getReports(query) {
    const { page, limit, skip } = Helpers.parsePagination(query);
    const where = {};

    if (query.status) where.status = query.status;
    if (query.targetType) where.targetType = query.targetType;

    const { data, total } = await this.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        reporter: { select: { id: true, username: true, displayName: true } },
      },
    });

    return { data, meta: Helpers.paginationMeta(page, limit, total) };
  }

  /**
   * Resolves a report (approve/dismiss).
   * @param {string} reportId
   * @param {string} moderatorId
   * @param {{ status: string, moderatorNote?: string }} action
   * @returns {Promise<object>}
   */
  async resolveReport(reportId, moderatorId, { status, moderatorNote }) {
    const report = await this.findById(reportId);
    if (!report) throw new NotFoundError('Report');

    const updated = await this.update(reportId, {
      status,
      moderatorId,
      moderatorNote,
      resolvedAt: new Date(),
    });

    logger.info(`Report ${reportId} resolved as ${status} by moderator ${moderatorId}`);
    return updated;
  }

  /**
   * Bans or suspends a user.
   * @param {string} userId
   * @param {string} moderatorId
   * @param {{ reason: string, duration?: number }} params - duration in days (null = permanent)
   */
  async banUser(userId, moderatorId, { reason, duration }) {
    const db = Database.getInstance().getClient();

    const banData = {
      isActive: false,
      bannedAt: new Date(),
      banReason: reason,
      bannedById: moderatorId,
    };

    if (duration) {
      banData.banExpiresAt = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
    }

    await db.user.update({ where: { id: userId }, data: banData });

    logger.warn(`User ${userId} banned by moderator ${moderatorId}. Reason: ${reason}`);
  }
}

export default new ModerationService();
