// Export all validators
export * from './auth.validator.js';
export * from './user.validator.js';
export * from './mentor.validator.js';
export * from './mentee.validator.js';
export * from './payment.validator.js';

// Import default exports
import authValidator from './auth.validator.js';
import userValidator from './user.validator.js';
import mentorValidator from './mentor.validator.js';
import menteeValidator from './mentee.validator.js';
import paymentValidator from './payment.validator.js';

// Re-export as named exports
export {
  authValidator,
  userValidator,
  mentorValidator,
  menteeValidator,
  paymentValidator,
};

// Export utility function to handle Zod validation errors
export const formatZodError = (error) => {
  if (error.errors) {
    return error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
  }
  return [{ field: 'unknown', message: error.message }];
};

// Validation middleware factory
export const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.body);
      req.body = validated;
      next();
    } catch (error) {
      const errors = formatZodError(error);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  };
};

// Query validation middleware factory
export const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.query);
      req.query = validated;
      next();
    } catch (error) {
      const errors = formatZodError(error);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  };
};

// Params validation middleware factory
export const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      const validated = schema.parse(req.params);
      req.params = validated;
      next();
    } catch (error) {
      const errors = formatZodError(error);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }
  };
};

export default {
  authValidator,
  userValidator,
  mentorValidator,
  menteeValidator,
  paymentValidator,
  formatZodError,
  validate,
  validateQuery,
  validateParams,
};
