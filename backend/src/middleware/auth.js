/**
 * Authentication Middleware
 * JWT verification and role-based access control.
 * Pattern: Middleware / Decorator
 */

import jwt from 'jsonwebtoken';
import Environment from '../config/environment.js';
import { UnauthorizedError, ForbiddenError } from '../errors/index.js';

class AuthMiddleware {
  /**
   * Verifies JWT token from Authorization header.
   * Attaches decoded user to req.user.
   */
  static authenticate(req, _res, next) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Access token is required');
      }

      const token = authHeader.split(' ')[1];
      const env = Environment.getInstance();
      const decoded = jwt.verify(token, env.jwtSecret);

      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
        username: decoded.username,
      };

      next();
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return next(error);
      }
      next(new UnauthorizedError('Invalid or expired token'));
    }
  }

  /**
   * Optional authentication — attaches user if token present, but doesn't fail.
   * Useful for public routes that show extra data to logged-in users.
   */
  static optionalAuth(req, _res, next) {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const env = Environment.getInstance();
        const decoded = jwt.verify(token, env.jwtSecret);
        req.user = {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role,
          username: decoded.username,
        };
      }
    } catch (_err) {
      // Silently ignore invalid token for optional auth
      req.user = null;
    }
    next();
  }

  /**
   * Role-based access control.
   * Usage: AuthMiddleware.authorize('ADMIN', 'MODERATOR')
   * @param  {...string} roles - Allowed roles
   * @returns {Function} Express middleware
   */
  static authorize(...roles) {
    return (req, _res, next) => {
      if (!req.user) {
        return next(new UnauthorizedError('Authentication required'));
      }

      if (!roles.includes(req.user.role)) {
        return next(new ForbiddenError('You do not have permission to perform this action'));
      }

      next();
    };
  }
}

export default AuthMiddleware;
