/**
 * User Routes
 */

import { Router } from 'express';
import userController from '../controllers/UserController.js';
import AuthMiddleware from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

// Protected
router.get('/profile', AuthMiddleware.authenticate, userController.getProfile);
router.put('/profile', AuthMiddleware.authenticate, userController.updateProfile);

// Public
router.get('/:id', userController.getProfile);

// Admin
router.get(
  '/',
  AuthMiddleware.authenticate,
  AuthMiddleware.authorize(ROLES.ADMIN),
  userController.getAll
);

export default router;
