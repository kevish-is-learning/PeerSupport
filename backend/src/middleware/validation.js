/**
 * Validation Middleware
 * Wraps express-validator to auto-catch validation errors.
 * Pattern: Middleware / Chain of Responsibility
 */

import { validationResult } from 'express-validator';
import { ValidationError } from '../errors/index.js';

class ValidationMiddleware {
  /**
   * Runs after express-validator check chains.
   * If errors exist, throws a ValidationError.
   */
  static validate(req, _res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
        value: err.value,
      }));
      return next(new ValidationError(formattedErrors));
    }
    next();
  }

  /**
   * Factory: returns an array of [validators..., validate middleware].
   * Usage in routes: ...ValidationMiddleware.run([ body('email').isEmail() ])
   * @param {Array} validations - Array of express-validator chains
   * @returns {Array} Middleware array
   */
  static run(validations) {
    return [...validations, ValidationMiddleware.validate];
  }
}

export default ValidationMiddleware;
