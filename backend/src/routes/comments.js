/**
 * Comment Routes
 */

import { Router } from 'express';
import commentController from '../controllers/CommentController.js';
import AuthMiddleware from '../middleware/auth.js';
import CommentValidators from '../validators/comment.js';
import RateLimiter from '../middleware/rateLimiter.js';

const router = Router();

// Public: get comments for a post
router.get('/posts/:postId/comments', commentController.getByPost);

// Protected
router.post(
  '/posts/:postId/comments',
  AuthMiddleware.authenticate,
  CommentValidators.create,
  commentController.create
);

router.put(
  '/comments/:id',
  AuthMiddleware.authenticate,
  commentController.update
);

router.delete(
  '/comments/:id',
  AuthMiddleware.authenticate,
  commentController.remove
);

export default router;
