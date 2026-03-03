/**
 * Report Validators
 */

import { body, param } from 'express-validator';

class ReportValidators {
  static create = [
    body('targetId')
      .isUUID()
      .withMessage('Invalid target ID'),
    body('targetType')
      .isIn(['POST', 'COMMENT', 'USER'])
      .withMessage('Target type must be POST, COMMENT, or USER'),
    body('reason')
      .isIn(['SPAM', 'HARASSMENT', 'INAPPROPRIATE', 'MISINFORMATION', 'SELF_HARM', 'OTHER'])
      .withMessage('Invalid report reason'),
    body('description')
      .optional()
      .trim()
      .isLength({ max: 500 })
      .withMessage('Description must be under 500 characters'),
  ];

  static resolve = [
    param('id')
      .isUUID()
      .withMessage('Invalid report ID'),
    body('status')
      .isIn(['RESOLVED', 'DISMISSED'])
      .withMessage('Status must be RESOLVED or DISMISSED'),
    body('moderatorNote')
      .optional()
      .trim()
      .isLength({ max: 500 }),
  ];
}

export default ReportValidators;
