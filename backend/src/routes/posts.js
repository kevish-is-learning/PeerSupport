/**
 * Post Routes
 */

import { Router } from 'express';
import postController from '../controllers/PostController.js';
import AuthMiddleware from '../middleware/auth.js';
import ValidationMiddleware from '../middleware/validation.js';
import PostValidators from '../validators/post.js';
import RateLimiter from '../middleware/rateLimiter.js';

const router = Router();

// Public
router.get(
  '/',
  ...ValidationMiddleware.run(PostValidators.getAll),
  postController.getAll
);

router.get(
  '/:id',
  AuthMiddleware.optionalAuth,
  ...ValidationMiddleware.run(PostValidators.idParam),
  postController.getOne
);

// Protected
router.post(
  '/',
  AuthMiddleware.authenticate,
  RateLimiter.create,
  ...ValidationMiddleware.run(PostValidators.create),
  postController.create
);

router.put(
  '/:id',
  AuthMiddleware.authenticate,
  ...ValidationMiddleware.run(PostValidators.update),
  postController.update
);

router.delete(
  '/:id',
  AuthMiddleware.authenticate,
  ...ValidationMiddleware.run(PostValidators.idParam),
  postController.remove
);

export default router;
