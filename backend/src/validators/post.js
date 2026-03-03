/**
 * Post Validators
 * Express-validator chains for post routes.
 */

import { body, param, query } from 'express-validator';

class PostValidators {
  static create = [
    body('title')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Title must be between 5 and 200 characters'),
    body('content')
      .trim()
      .isLength({ min: 10 })
      .withMessage('Content must be at least 10 characters'),
    body('categoryId')
      .notEmpty()
      .withMessage('Category is required')
      .isUUID()
      .withMessage('Invalid category ID'),
    body('isAnonymous')
      .optional()
      .isBoolean()
      .withMessage('isAnonymous must be a boolean'),
    body('tags')
      .optional()
      .isArray({ max: 5 })
      .withMessage('Maximum 5 tags allowed'),
  ];

  static update = [
    param('id')
      .isUUID()
      .withMessage('Invalid post ID'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Title must be between 5 and 200 characters'),
    body('content')
      .optional()
      .trim()
      .isLength({ min: 10 })
      .withMessage('Content must be at least 10 characters'),
  ];

  static getAll = [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage('Limit must be between 1 and 50'),
    query('sortBy')
      .optional()
      .isIn(['newest', 'oldest', 'most_upvoted', 'most_commented', 'trending'])
      .withMessage('Invalid sort option'),
  ];

  static idParam = [
    param('id')
      .isUUID()
      .withMessage('Invalid post ID'),
  ];
}

export default PostValidators;
