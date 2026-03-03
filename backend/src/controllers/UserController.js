/**
 * User Controller
 * Handles user profile and admin user management endpoints.
 * Pattern: Controller / Delegate to Service
 */

import BaseController from './BaseController.js';
import userService from '../services/UserService.js';

class UserController extends BaseController {
  constructor() {
    super(userService);
  }

  /**
   * GET /api/users/:id
   */
  getProfile = BaseController.asyncHandler(async (req, res) => {
    const user = await this.service.getProfile(req.params.id);
    this.success(res, user);
  });

  /**
   * PUT /api/users/profile
   */
  updateProfile = BaseController.asyncHandler(async (req, res) => {
    const user = await this.service.updateProfile(req.user.id, req.body);
    this.success(res, user, 'Profile updated');
  });

  /**
   * GET /api/users (admin)
   */
  getAll = BaseController.asyncHandler(async (req, res) => {
    const { data, meta } = await this.service.getUsers(req.query);
    this.success(res, data, 'Users retrieved', 200, meta);
  });
}

export default new UserController();
