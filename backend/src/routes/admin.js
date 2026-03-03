/**
 * Admin Routes
 */

import { Router } from 'express';
import adminController from '../controllers/AdminController.js';
import AuthMiddleware from '../middleware/auth.js';
import ReportValidators from '../validators/report.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

// Anyone authenticated can submit a report
router.post(
  '/reports',
  AuthMiddleware.authenticate,
  adminController.createReport
);

// Moderator/Admin only below
router.use(AuthMiddleware.authenticate, AuthMiddleware.authorize(ROLES.ADMIN, ROLES.MODERATOR));

router.get('/reports', adminController.getReports);

router.put(
  '/reports/:id/resolve',
  ...ReportValidators.resolve,
  adminController.resolveReport
);

router.post('/users/:id/ban', adminController.banUser);

export default router;
