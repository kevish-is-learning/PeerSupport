/**
 * Content Service
 *
 * Blog/resources, FAQs and testimonials. Public reads only ever return
 * published rows; admin reads return everything.
 */

import { prisma } from '../config/database.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/** URL-safe slug; a short suffix keeps same-titled posts from colliding. */
const slugify = (title) => {
  const base = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60);
  return base || 'post';
};

/** ~200 wpm, rounded up, floor of 1. */
const estimateReadingMinutes = (content) => {
  const words = String(content || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const mapPost = (post, { includeContent = true } = {}) => ({
  id: post.id,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  ...(includeContent ? { content: post.content } : {}),
  coverImageUrl: post.coverImageUrl,
  tags: post.tags,
  status: post.status,
  readingMinutes: post.readingMinutes,
  publishedAt: post.publishedAt,
  createdAt: post.createdAt,
  authorName: post.author?.name ?? null,
});

class ContentService {
  // ─── Blog ────────────────────────────────────────────────────────────────

  async listPosts({ page = 1, limit = 9, tag, search, includeDrafts = false } = {}) {
    const where = includeDrafts ? {} : { status: 'PUBLISHED' };

    if (tag) where.tags = { has: tag };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
        skip,
        take,
        include: { author: { select: { name: true } } },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return {
      posts: posts.map((p) => mapPost(p, { includeContent: false })),
      total,
      page: Number(page),
      limit: take,
    };
  }

  async getPostBySlug(slug, { includeDrafts = false } = {}) {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { author: { select: { name: true } } },
    });

    if (!post || (!includeDrafts && post.status !== 'PUBLISHED')) {
      throw createServiceError(404, 'Article not found');
    }

    return mapPost(post);
  }

  /** Distinct tags across published posts, for the blog filter bar. */
  async listTags() {
    const posts = await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      select: { tags: true },
    });

    return [...new Set(posts.flatMap((p) => p.tags))].sort();
  }

  async createPost(authorId, data) {
    const slug = await this._uniqueSlug(slugify(data.slug || data.title));

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title: data.title,
        excerpt: data.excerpt || null,
        content: data.content,
        coverImageUrl: data.coverImageUrl || null,
        tags: data.tags || [],
        authorId,
        status: data.status || 'DRAFT',
        readingMinutes: estimateReadingMinutes(data.content),
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
      },
      include: { author: { select: { name: true } } },
    });

    return mapPost(post);
  }

  async updatePost(id, data) {
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    if (!existing) throw createServiceError(404, 'Article not found');

    // Stamp publishedAt the first time a post actually goes live.
    const goingLive = data.status === 'PUBLISHED' && existing.status !== 'PUBLISHED';

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(data.title !== undefined ? { title: data.title } : {}),
        ...(data.excerpt !== undefined ? { excerpt: data.excerpt } : {}),
        ...(data.content !== undefined
          ? { content: data.content, readingMinutes: estimateReadingMinutes(data.content) }
          : {}),
        ...(data.coverImageUrl !== undefined ? { coverImageUrl: data.coverImageUrl } : {}),
        ...(data.tags !== undefined ? { tags: data.tags } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
        ...(goingLive ? { publishedAt: new Date() } : {}),
      },
      include: { author: { select: { name: true } } },
    });

    return mapPost(post);
  }

  async deletePost(id) {
    await prisma.blogPost.delete({ where: { id } }).catch(() => {
      throw createServiceError(404, 'Article not found');
    });
    return { id };
  }

  async _uniqueSlug(base) {
    const taken = await prisma.blogPost.findUnique({ where: { slug: base }, select: { id: true } });
    if (!taken) return base;
    return `${base}-${Date.now().toString(36).slice(-4)}`;
  }

  // ─── FAQ ─────────────────────────────────────────────────────────────────

  async listFaqs({ includeUnpublished = false } = {}) {
    const faqs = await prisma.faq.findMany({
      where: includeUnpublished ? {} : { isPublished: true },
      orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    return faqs;
  }

  async createFaq(data) {
    return prisma.faq.create({ data });
  }

  async updateFaq(id, data) {
    const existing = await prisma.faq.findUnique({ where: { id }, select: { id: true } });
    if (!existing) throw createServiceError(404, 'FAQ not found');
    return prisma.faq.update({ where: { id }, data });
  }

  async deleteFaq(id) {
    await prisma.faq.delete({ where: { id } }).catch(() => {
      throw createServiceError(404, 'FAQ not found');
    });
    return { id };
  }

  // ─── Testimonials ────────────────────────────────────────────────────────

  async listTestimonials({ includeUnpublished = false } = {}) {
    return prisma.testimonial.findMany({
      where: includeUnpublished ? {} : { isPublished: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async createTestimonial(data) {
    return prisma.testimonial.create({ data });
  }

  async updateTestimonial(id, data) {
    const existing = await prisma.testimonial.findUnique({ where: { id }, select: { id: true } });
    if (!existing) throw createServiceError(404, 'Testimonial not found');
    return prisma.testimonial.update({ where: { id }, data });
  }

  async deleteTestimonial(id) {
    await prisma.testimonial.delete({ where: { id } }).catch(() => {
      throw createServiceError(404, 'Testimonial not found');
    });
    return { id };
  }
}

export default new ContentService();
