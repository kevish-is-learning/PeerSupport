/**
 * Admin Controller
 * Handles moderation and admin-specific endpoints.
 * Pattern: Controller / Delegate to Service
 */

import BaseController from './BaseController.js';
import moderationService from '../services/ModerationService.js';

class AdminController extends BaseController {
  constructor() {
    super(moderationService);
  }

  /**
   * POST /api/reports
   */
  createReport = BaseController.asyncHandler(async (req, res) => {
    const report = await this.service.createReport({
      ...req.body,
      reporterId: req.user.id,
    });
    this.created(res, report, 'Report submitted');
  });

  /**
   * GET /api/admin/reports
   */
  getReports = BaseController.asyncHandler(async (req, res) => {
    const { data, meta } = await this.service.getReports(req.query);
    this.success(res, data, 'Reports retrieved', 200, meta);
  });

  /**
   * PUT /api/admin/reports/:id/resolve
   */
  resolveReport = BaseController.asyncHandler(async (req, res) => {
    const report = await this.service.resolveReport(req.params.id, req.user.id, req.body);
    this.success(res, report, 'Report resolved');
  });

  /**
   * POST /api/admin/users/:id/ban
   */
  banUser = BaseController.asyncHandler(async (req, res) => {
    await this.service.banUser(req.params.id, req.user.id, req.body);
    this.success(res, null, 'User banned');
  });
}

export default new AdminController();
