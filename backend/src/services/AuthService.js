/**
 * Auth Service
 * Handles user registration, login, token management.
 * Pattern: Service Layer
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import BaseService from './BaseService.js';
import Environment from '../config/environment.js';
import { UnauthorizedError, ConflictError, BadRequestError } from '../errors/index.js';
import Helpers from '../utils/helpers.js';
import logger from '../utils/logger.js';

class AuthService extends BaseService {
  constructor() {
    super('user');
  }

  /**
   * Registers a new user.
   * @param {{ username: string, email: string, password: string, displayName?: string }} data
   * @returns {Promise<{ user: object, accessToken: string, refreshToken: string }>}
   */
  async register({ username, email, password, displayName }) {
    // Check uniqueness
    const existingUser = await this.findOne({
      OR: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ConflictError(
        existingUser.email === email
          ? 'Email already registered'
          : 'Username already taken'
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await this.create({
      username,
      email,
      password: hashedPassword,
      displayName: displayName || username,
    });

    // Generate tokens
    const tokens = this._generateTokens(user);

    logger.info(`User registered: ${user.email}`);

    return {
      user: Helpers.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Authenticates a user with email/password.
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ user: object, accessToken: string, refreshToken: string }>}
   */
  async login({ email, password }) {
    const user = await this.findOne({ email });

    if (!user || !user.isActive) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Update last login
    await this.update(user.id, { lastLoginAt: new Date() });

    const tokens = this._generateTokens(user);

    logger.info(`User logged in: ${user.email}`);

    return {
      user: Helpers.sanitizeUser(user),
      ...tokens,
    };
  }

  /**
   * Refreshes the access token using a refresh token.
   * @param {string} refreshToken
   * @returns {Promise<{ accessToken: string, refreshToken: string }>}
   */
  async refreshToken(refreshToken) {
    const env = Environment.getInstance();

    try {
      const decoded = jwt.verify(refreshToken, env.jwtRefreshSecret);
      const user = await this.findById(decoded.id);

      if (!user || !user.isActive) {
        throw new UnauthorizedError('Invalid refresh token');
      }

      return this._generateTokens(user);
    } catch (error) {
      throw new UnauthorizedError('Invalid or expired refresh token');
    }
  }

  /**
   * Changes user password.
   * @param {string} userId
   * @param {string} currentPassword
   * @param {string} newPassword
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await this.findById(userId);

    if (!user) {
      throw new BadRequestError('User not found');
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      throw new BadRequestError('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await this.update(userId, { password: hashedPassword });

    logger.info(`Password changed for user: ${user.email}`);
  }

  /**
   * Generates JWT access and refresh tokens.
   * @param {object} user
   * @returns {{ accessToken: string, refreshToken: string }}
   * @private
   */
  _generateTokens(user) {
    const env = Environment.getInstance();

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    const accessToken = jwt.sign(payload, env.jwtSecret, {
      expiresIn: env.jwtExpiresIn,
    });

    const refreshToken = jwt.sign({ id: user.id }, env.jwtRefreshSecret, {
      expiresIn: env.jwtRefreshExpiresIn,
    });

    return { accessToken, refreshToken };
  }
}

export default new AuthService();
