/**
 * Auth Routes
 */

import { Router } from 'express';
import authController from '../controllers/AuthController.js';
import AuthMiddleware from '../middleware/auth.js';
import AuthValidators from '../validators/auth.js';
import RateLimiter from '../middleware/rateLimiter.js';
import passport from '../config/passport.js';

const router = Router();

// Public routes
router.post(
  '/register',
  RateLimiter.auth,
  authController.register
);

router.post(
  '/login',
  RateLimiter.auth,
  authController.login
);

router.post(
  '/refresh',
  authController.refresh
);

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    session: false,
    failureRedirect: '/login' 
  }),
  authController.googleCallback
);

// Protected routes
router.get('/me', AuthMiddleware.authenticate, authController.getMe);

router.put(
  '/change-password',
  AuthMiddleware.authenticate,
  authController.changePassword
);

export default router;
