/**
 * Comment Controller
 * Handles comment-related HTTP endpoints.
 * Pattern: Controller / Delegate to Service
 */

import BaseController from './BaseController.js';
import commentService from '../services/CommentService.js';

class CommentController extends BaseController {
  constructor() {
    super(commentService);
  }

  /**
   * POST /api/posts/:postId/comments
   */
  create = BaseController.asyncHandler(async (req, res) => {
    const data = { ...req.body, postId: req.params.postId };
    const comment = await this.service.createComment(data, req.user.id);
    this.created(res, comment, 'Comment created');
  });

  /**
   * GET /api/posts/:postId/comments
   */
  getByPost = BaseController.asyncHandler(async (req, res) => {
    const { data, meta } = await this.service.getCommentsByPost(req.params.postId, req.query);
    this.success(res, data, 'Comments retrieved', 200, meta);
  });

  /**
   * PUT /api/comments/:id
   */
  update = BaseController.asyncHandler(async (req, res) => {
    const comment = await this.service.updateComment(req.params.id, req.body.content, req.user);
    this.success(res, comment, 'Comment updated');
  });

  /**
   * DELETE /api/comments/:id
   */
  remove = BaseController.asyncHandler(async (req, res) => {
    await this.service.deleteComment(req.params.id, req.user);
    this.noContent(res);
  });
}

export default new CommentController();
