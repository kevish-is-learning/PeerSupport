/**
 * Post Service
 * Handles CRUD, voting, and querying for posts.
 * Pattern: Service Layer
 */

import BaseService from './BaseService.js';
import { NotFoundError, ForbiddenError } from '../errors/index.js';
import { CACHE_KEYS, CACHE_TTL, SORT_BY } from '../utils/constants.js';
import Helpers from '../utils/helpers.js';
import logger from '../utils/logger.js';

class PostService extends BaseService {
  constructor() {
    super('post');
  }


  async createPost(data, userId) {
    const post = await this.create({
      ...data,
      authorId: userId,
      slug: Helpers.slugify(data.title),
    }, {
      include: {
        author: { select: { id: true, username: true, displayName: true, avatar: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });

    // Invalidate posts list cache
    await this.cache.invalidatePattern(`${CACHE_KEYS.POSTS_LIST}:*`);

    logger.info(`Post created: ${post.id} by user ${userId}`);
    return post;
  }

  /**
   * Gets a single post by ID or slug, incrementing view count.
   * @param {string} identifier - Post ID or slug
   * @param {string|null} userId - Current user id (for vote status)
   * @returns {Promise<object>}
   */
  async getPost(identifier, userId = null) {
    const where = identifier.length === 36
      ? { id: identifier, deletedAt: null }
      : { slug: identifier, deletedAt: null };

    const post = await this.model.findFirst({
      where,
      include: {
        author: { select: { id: true, username: true, displayName: true, avatar: true } },
        category: true,
        tags: { include: { tag: true } },
        _count: { select: { comments: true, votes: true } },
      },
    });

    if (!post) {
      throw new NotFoundError('Post');
    }

    // Increment view count (fire and forget)
    this.model.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

    return post;
  }

  /**
   * Gets paginated, filtered, sorted posts.
   * @param {object} query - { page, limit, category, tag, search, sortBy }
   * @returns {Promise<{ data: object[], meta: object }>}
   */
  async getPosts(query) {
    const { page, limit, skip } = Helpers.parsePagination(query);
    const where = { deletedAt: null };

    // Filters
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.authorId) where.authorId = query.authorId;
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { content: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // Sort
    let orderBy = { createdAt: 'desc' };
    switch (query.sortBy) {
      case SORT_BY.OLDEST:
        orderBy = { createdAt: 'asc' };
        break;
      case SORT_BY.MOST_UPVOTED:
        orderBy = { upvoteCount: 'desc' };
        break;
      case SORT_BY.MOST_COMMENTED:
        orderBy = { commentCount: 'desc' };
        break;
    }

    const { data, total } = await this.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        author: { select: { id: true, username: true, displayName: true, avatar: true } },
        category: true,
        tags: { include: { tag: true } },
        _count: { select: { comments: true, votes: true } },
      },
    });

    return { data, meta: Helpers.paginationMeta(page, limit, total) };
  }

  /**
   * Updates a post — only the author or admin can update.
   * @param {string} postId
   * @param {object} data
   * @param {object} currentUser - { id, role }
   * @returns {Promise<object>}
   */
  async updatePost(postId, data, currentUser) {
    const post = await this.findById(postId);
    if (!post || post.deletedAt) throw new NotFoundError('Post');

    if (post.authorId !== currentUser.id && currentUser.role !== 'ADMIN') {
      throw new ForbiddenError('You can only edit your own posts');
    }

    if (data.title) data.slug = Helpers.slugify(data.title);

    const updated = await this.update(postId, data, {
      include: {
        author: { select: { id: true, username: true, displayName: true, avatar: true } },
        category: true,
        tags: { include: { tag: true } },
      },
    });

    await this.cache.invalidatePattern(`${CACHE_KEYS.POSTS_LIST}:*`);
    await this.cache.del(`${CACHE_KEYS.POST_DETAIL}:${postId}`);

    return updated;
  }

  /**
   * Soft-deletes a post.
   * @param {string} postId
   * @param {object} currentUser
   */
  async deletePost(postId, currentUser) {
    const post = await this.findById(postId);
    if (!post || post.deletedAt) throw new NotFoundError('Post');

    if (post.authorId !== currentUser.id && !['ADMIN', 'MODERATOR'].includes(currentUser.role)) {
      throw new ForbiddenError('You can only delete your own posts');
    }

    await this.delete(postId);
    await this.cache.invalidatePattern(`${CACHE_KEYS.POSTS_LIST}:*`);
    await this.cache.del(`${CACHE_KEYS.POST_DETAIL}:${postId}`);

    logger.info(`Post deleted: ${postId} by user ${currentUser.id}`);
  }
}

export default new PostService();
