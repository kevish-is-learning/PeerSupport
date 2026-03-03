/**
 * Base Controller
 * Abstract class providing common controller patterns.
 * All domain controllers extend this.
 * Pattern: Template Method
 */

import Helpers from '../utils/helpers.js';

class BaseController {
  /**
   * @param {object} service - The service instance this controller delegates to
   */
  constructor(service) {
    this.service = service;
  }

  /**
   * Wraps an async route handler to catch errors and forward to Express error handler.
   * Eliminates the need for try/catch in every controller method.
   * @param {Function} fn - Async function (req, res, next) => {}
   * @returns {Function}
   */
  static asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }

  /**
   * Sends a success response.
   * @param {import('express').Response} res
   * @param {any} data
   * @param {string} message
   * @param {number} statusCode
   * @param {object} meta
   */
  success(res, data, message = 'Success', statusCode = 200, meta = null) {
    res.status(statusCode).json(Helpers.successResponse(data, message, meta));
  }

  /**
   * Sends a created response.
   * @param {import('express').Response} res
   * @param {any} data
   * @param {string} message
   */
  created(res, data, message = 'Created successfully') {
    this.success(res, data, message, 201);
  }

  /**
   * Sends a no-content response.
   * @param {import('express').Response} res
   */
  noContent(res) {
    res.status(204).send();
  }
}

export default BaseController;
