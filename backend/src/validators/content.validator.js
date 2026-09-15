import { z } from 'zod';

const contentStatus = z.enum(['DRAFT', 'PUBLISHED']);

export const createPostSchema = z.object({
  title: z.string().trim().min(3, 'Title is required').max(200),
  slug: z.string().trim().max(80).optional(),
  excerpt: z.string().trim().max(400).optional(),
  content: z.string().trim().min(50, 'Article body must be at least 50 characters'),
  coverImageUrl: z.string().url('Cover image must be a valid URL').optional().or(z.literal('')),
  tags: z.array(z.string().trim().min(1)).max(10).optional(),
  status: contentStatus.optional(),
});

export const updatePostSchema = createPostSchema.partial();

export const faqSchema = z.object({
  question: z.string().trim().min(5, 'Question is required').max(300),
  answer: z.string().trim().min(5, 'Answer is required').max(3000),
  category: z.string().trim().max(60).optional(),
  sortOrder: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
});

export const updateFaqSchema = faqSchema.partial();

export const testimonialSchema = z.object({
  authorName: z.string().trim().min(2, 'Name is required').max(120),
  authorRole: z.string().trim().max(160).optional(),
  authorImageUrl: z.string().url('Image must be a valid URL').optional().or(z.literal('')),
  quote: z.string().trim().min(10, 'Quote is required').max(1000),
  rating: z.number().int().min(1).max(5).optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const updateTestimonialSchema = testimonialSchema.partial();

export const createTicketSchema = z.object({
  subject: z.string().trim().min(5, 'Subject is required').max(200),
  category: z.string().trim().max(60).optional(),
  message: z.string().trim().min(10, 'Please describe your issue in at least 10 characters').max(4000),
});

export const ticketReplySchema = z.object({
  body: z.string().trim().min(1, 'Reply cannot be empty').max(4000),
});

export const ticketStatusSchema = z.object({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
});
