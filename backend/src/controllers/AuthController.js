/**
 * Auth Controller
 * Handles authentication HTTP endpoints.
 * Pattern: Controller / Delegate to Service
 */

import BaseController from './BaseController.js';
import authService from '../services/AuthService.js';
import UserService from '../services/UserService.js';

class AuthController extends BaseController {
  constructor() {
    super(authService);
  }

  /**
   * POST /api/auth/register
   */
  register = BaseController.asyncHandler(async (req, res) => {
    const result = await this.service.register(req.body);
    this.created(res, result, 'Registration successful');
  });

  /**
   * POST /api/auth/login
   */
  login = BaseController.asyncHandler(async (req, res) => {
    const result = await this.service.login(req.body);
    this.success(res, result, 'Login successful');
  });

  /**
   * POST /api/auth/refresh
   */
  refresh = BaseController.asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const tokens = await this.service.refreshToken(refreshToken);
    this.success(res, tokens, 'Token refreshed');
  });

  /**
   * PUT /api/auth/change-password
   */
  changePassword = BaseController.asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    await this.service.changePassword(req.user.id, currentPassword, newPassword);
    this.success(res, null, 'Password changed successfully');
  });

  /**
   * GET /api/auth/me
   */
  getMe = BaseController.asyncHandler(async (req, res) => {
    const user = await UserService.getProfile(req.user.id);
    this.success(res, user);
  });

  /**
   * GET /api/auth/google/callback
   * Handle Google OAuth callback
   */
  googleCallback = BaseController.asyncHandler(async (req, res) => {
    // User is attached to req by passport
    const result = await this.service.handleOAuthLogin(req.user);
    
    // Redirect to frontend with tokens
    const env = require('../config/environment.js').default.getInstance();
    const redirectUrl = `${env.clientUrl}/auth/callback?token=${result.accessToken}&refresh=${result.refreshToken}`;
    res.redirect(redirectUrl);
  });
}

export default new AuthController();
