/**
 * Post Controller
 * Handles post-related HTTP endpoints.
 * Pattern: Controller / Delegate to Service
 */

import BaseController from './BaseController.js';
import postService from '../services/PostService.js';

class PostController extends BaseController {
  constructor() {
    super(postService);
  }

  /**
   * POST /api/posts
   */
  create = BaseController.asyncHandler(async (req, res) => {
    const post = await this.service.createPost(req.body, req.user.id);
    this.created(res, post, 'Post created successfully');
  });

  /**
   * GET /api/posts
   */
  getAll = BaseController.asyncHandler(async (req, res) => {
    const { data, meta } = await this.service.getPosts(req.query);
    this.success(res, data, 'Posts retrieved', 200, meta);
  });

  /**
   * GET /api/posts/:id
   */
  getOne = BaseController.asyncHandler(async (req, res) => {
    const userId = req.user?.id || null;
    const post = await this.service.getPost(req.params.id, userId);
    this.success(res, post);
  });

  /**
   * PUT /api/posts/:id
   */
  update = BaseController.asyncHandler(async (req, res) => {
    const post = await this.service.updatePost(req.params.id, req.body, req.user);
    this.success(res, post, 'Post updated successfully');
  });

  /**
   * DELETE /api/posts/:id
   */
  remove = BaseController.asyncHandler(async (req, res) => {
    await this.service.deletePost(req.params.id, req.user);
    this.noContent(res);
  });
}

export default new PostController();
