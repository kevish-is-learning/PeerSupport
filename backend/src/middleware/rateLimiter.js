/**
 * Rate Limiter Middleware
 * Configurable rate limiters for different route categories.
 * Pattern: Strategy
 */

import rateLimit from 'express-rate-limit';
import Environment from '../config/environment.js';

class RateLimiter {
  /**
   * General API rate limiter.
   */
  static get api() {
    const env = Environment.getInstance();
    return rateLimit({
      windowMs: env.rateLimitWindowMs,
      max: env.rateLimitMax,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        message: 'Too many requests, please try again later',
      },
    });
  }

  /**
   * Strict rate limiter for auth routes (login/register).
   */
  static get auth() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        message: 'Too many auth attempts, please try again later',
      },
    });
  }

  /**
   * Rate limiter for content creation (posts, comments).
   */
  static get create() {
    return rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 20,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        message: 'Too many creation requests, please slow down',
      },
    });
  }

  /**
   * Custom rate limiter factory.
   * @param {number} windowMs
   * @param {number} max
   * @returns {Function}
   */
  static custom(windowMs, max) {
    return rateLimit({
      windowMs,
      max,
      standardHeaders: true,
      legacyHeaders: false,
      message: {
        success: false,
        message: 'Rate limit exceeded',
      },
    });
  }
}

export default RateLimiter;
