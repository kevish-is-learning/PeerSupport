/**
 * Global Error Handler Middleware
 * Catches all errors and returns standardized error responses.
 * Pattern: Middleware / Chain of Responsibility
 */

import logger from '../utils/logger.js';
import Helpers from '../utils/helpers.js';
import { AppError } from '../errors/index.js';

class ErrorHandler {
  /**
   * Express error-handling middleware.
   * Must have 4 params (err, req, res, next) for Express to recognize it.
   */
  static handle(err, req, res, _next) {
    // Default to 500 for unexpected errors
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || [];

    // Prisma known errors
    if (err.code === 'P2002') {
      statusCode = 409;
      message = 'A record with that value already exists';
      errors = [{ field: err.meta?.target, message }];
    }

    if (err.code === 'P2025') {
      statusCode = 404;
      message = 'Record not found';
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
      statusCode = 401;
      message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
      statusCode = 401;
      message = 'Token expired';
    }

    // Log error details
    if (statusCode >= 500) {
      logger.error(`[${req.method}] ${req.originalUrl} — ${message}`, {
        stack: err.stack,
        body: req.body,
        params: req.params,
      });
    } else {
      logger.warn(`[${req.method}] ${req.originalUrl} — ${statusCode} ${message}`);
    }

    // Don't leak stack traces in production
    const response = Helpers.errorResponse(message, errors);
    if (process.env.NODE_ENV === 'development' && statusCode >= 500) {
      response.stack = err.stack;
    }

    res.status(statusCode).json(response);
  }

  /**
   * Catches 404 routes that don't match any handler.
   */
  static notFound(req, res, _next) {
    res.status(404).json(Helpers.errorResponse(`Route ${req.originalUrl} not found`));
  }
}

export default ErrorHandler;
