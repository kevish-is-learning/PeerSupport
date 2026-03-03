/**
 * Comment Validators
 */

import { body, param } from 'express-validator';

class CommentValidators {
  static create = [
    body('content')
      .trim()
      .isLength({ min: 1, max: 2000 })
      .withMessage('Comment must be between 1 and 2000 characters'),
    body('parentId')
      .optional()
      .isUUID()
      .withMessage('Invalid parent comment ID'),
    body('isAnonymous')
      .optional()
      .isBoolean()
      .withMessage('isAnonymous must be a boolean'),
  ];

  static update = [
    param('id')
      .isUUID()
      .withMessage('Invalid comment ID'),
    body('content')
      .trim()
      .isLength({ min: 1, max: 2000 })
      .withMessage('Comment must be between 1 and 2000 characters'),
  ];
}

export default CommentValidators;
