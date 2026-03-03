/**
 * Auth Routes
 */

import { Router } from 'express';
import authController from '../controllers/AuthController.js';
import AuthMiddleware from '../middleware/auth.js';
import ValidationMiddleware from '../middleware/validation.js';
import AuthValidators from '../validators/auth.js';
import RateLimiter from '../middleware/rateLimiter.js';

const router = Router();

// Public routes
router.post(
  '/register',
  RateLimiter.auth,
  ...ValidationMiddleware.run(AuthValidators.register),
  authController.register
);

router.post(
  '/login',
  RateLimiter.auth,
  ...ValidationMiddleware.run(AuthValidators.login),
  authController.login
);

router.post(
  '/refresh',
  ...ValidationMiddleware.run(AuthValidators.refreshToken),
  authController.refresh
);

// Protected routes
router.get('/me', AuthMiddleware.authenticate, authController.getMe);

router.put(
  '/change-password',
  AuthMiddleware.authenticate,
  ...ValidationMiddleware.run(AuthValidators.changePassword),
  authController.changePassword
);

export default router;
