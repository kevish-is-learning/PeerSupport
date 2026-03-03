/**
 * Comment Service
 * Handles nested/threaded comments on posts.
 * Pattern: Service Layer
 */

import BaseService from './BaseService.js';
import { NotFoundError, ForbiddenError } from '../errors/index.js';
import logger from '../utils/logger.js';
import { Database } from '../config/database.js';
import Helpers from '../utils/helpers.js';

class CommentService extends BaseService {
  constructor() {
    super('comment');
  }

  /**
   * Creates a comment (top-level or reply).
   * @param {{ content: string, postId: string, parentId?: string }} data
   * @param {string} userId
   * @returns {Promise<object>}
   */
  async createComment({ content, postId, parentId, isAnonymous }, userId) {
    // Verify parent comment exists if it's a reply
    if (parentId) {
      const parentComment = await this.findById(parentId);
      if (!parentComment || parentComment.deletedAt) {
        throw new NotFoundError('Parent comment');
      }
    }

    const comment = await this.create(
      {
        content,
        postId,
        authorId: userId,
        parentId: parentId || null,
        isAnonymous: isAnonymous || false,
      },
      {
        include: {
          author: { select: { id: true, username: true, displayName: true, avatar: true } },
        },
      }
    );

    // Increment post comment count
    const db = Database.getInstance().getClient();
    await db.post.update({
      where: { id: postId },
      data: { commentCount: { increment: 1 } },
    });

    logger.info(`Comment created: ${comment.id} on post ${postId}`);
    return comment;
  }

  /**
   * Gets all comments for a post (threaded).
   * @param {string} postId
   * @param {object} query - { page, limit }
   * @returns {Promise<{ data: object[], meta: object }>}
   */
  async getCommentsByPost(postId, query) {
    const { page, limit, skip } = Helpers.parsePagination(query);

    // Get top-level comments
    const { data, total } = await this.findMany({
      where: { postId, parentId: null, deletedAt: null },
      skip,
      take: limit,
      orderBy: { createdAt: 'asc' },
      include: {
        author: { select: { id: true, username: true, displayName: true, avatar: true } },
        replies: {
          where: { deletedAt: null },
          include: {
            author: { select: { id: true, username: true, displayName: true, avatar: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: { select: { replies: true } },
      },
    });

    return { data, meta: Helpers.paginationMeta(page, limit, total) };
  }

  /**
   * Updates a comment.
   * @param {string} commentId
   * @param {string} content
   * @param {object} currentUser
   * @returns {Promise<object>}
   */
  async updateComment(commentId, content, currentUser) {
    const comment = await this.findById(commentId);
    if (!comment || comment.deletedAt) throw new NotFoundError('Comment');

    if (comment.authorId !== currentUser.id && currentUser.role !== 'ADMIN') {
      throw new ForbiddenError('You can only edit your own comments');
    }

    return this.update(commentId, { content, isEdited: true });
  }

  /**
   * Soft-deletes a comment.
   * @param {string} commentId
   * @param {object} currentUser
   */
  async deleteComment(commentId, currentUser) {
    const comment = await this.findById(commentId);
    if (!comment || comment.deletedAt) throw new NotFoundError('Comment');

    if (comment.authorId !== currentUser.id && !['ADMIN', 'MODERATOR'].includes(currentUser.role)) {
      throw new ForbiddenError('You can only delete your own comments');
    }

    await this.delete(commentId);

    // Decrement post comment count
    const db = Database.getInstance().getClient();
    await db.post.update({
      where: { id: comment.postId },
      data: { commentCount: { decrement: 1 } },
    });

    logger.info(`Comment deleted: ${commentId} by user ${currentUser.id}`);
  }
}

export default new CommentService();
