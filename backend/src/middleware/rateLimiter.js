/**
 * Rate Limiter Middleware
 * Prevents abuse by limiting request frequency
 */

import rateLimit from 'express-rate-limit';

class RateLimiter {
  /**
   * Standard rate limit for general API endpoints
   */
  static standard = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  /**
   * Strict rate limit for authentication endpoints
   */
  static auth = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: 'Too many authentication attempts, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });

  /**
   * Rate limit for creating content (posts, comments)
   */
  static content = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 20 requests per hour
    message: 'Too many content submissions, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
}

export default RateLimiter;
