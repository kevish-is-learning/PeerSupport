/**
 * Post Routes
 */

import { Router } from 'express';
import postController from '../controllers/PostController.js';
import AuthMiddleware from '../middleware/auth.js';
import PostValidators from '../validators/post.js';
import RateLimiter from '../middleware/rateLimiter.js';

const router = Router();

// Public
router.get(
  '/',
  postController.getAll
);

router.get(
  '/:id',
  AuthMiddleware.optionalAuth,
  postController.getOne
);

// Protected
router.post(
  '/',
  AuthMiddleware.authenticate,
  PostValidators.create,
  postController.create
);

router.put(
  '/:id',
  AuthMiddleware.authenticate,
  postController.update
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate,
  postController.remove
);

export default router;
