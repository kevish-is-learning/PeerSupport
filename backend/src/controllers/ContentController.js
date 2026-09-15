import contentService from '../services/ContentService.js';
import supportService from '../services/SupportService.js';
import { respond } from '../utils/controllerResponse.js';
import {
  createPostSchema,
  updatePostSchema,
  faqSchema,
  updateFaqSchema,
  testimonialSchema,
  updateTestimonialSchema,
  createTicketSchema,
  ticketReplySchema,
  ticketStatusSchema,
} from '../validators/content.validator.js';

class ContentController {
  // ─── Blog (public) ───────────────────────────────────────────────────────

  listPosts(req, res) {
    const { page, limit, tag, search } = req.query;
    return respond(res, {
      message: 'Articles fetched',
      action: () => contentService.listPosts({ page, limit, tag, search }),
    });
  }

  getPost(req, res) {
    return respond(res, {
      message: 'Article fetched',
      action: () => contentService.getPostBySlug(req.params.slug),
      data: (post) => ({ post }),
    });
  }

  listTags(_req, res) {
    return respond(res, {
      message: 'Tags fetched',
      action: () => contentService.listTags(),
      data: (tags) => ({ tags }),
    });
  }

  // ─── Blog (admin) ────────────────────────────────────────────────────────

  listAllPosts(req, res) {
    const { page, limit, search } = req.query;
    return respond(res, {
      message: 'Articles fetched',
      action: () => contentService.listPosts({ page, limit, search, includeDrafts: true }),
    });
  }

  createPost(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Article created',
      action: () => contentService.createPost(req.user.id, createPostSchema.parse(req.body)),
      data: (post) => ({ post }),
    });
  }

  updatePost(req, res) {
    return respond(res, {
      message: 'Article updated',
      action: () => contentService.updatePost(req.params.id, updatePostSchema.parse(req.body)),
      data: (post) => ({ post }),
    });
  }

  deletePost(req, res) {
    return respond(res, {
      message: 'Article deleted',
      action: () => contentService.deletePost(req.params.id),
    });
  }

  // ─── FAQ ─────────────────────────────────────────────────────────────────

  listFaqs(_req, res) {
    return respond(res, {
      message: 'FAQs fetched',
      action: () => contentService.listFaqs(),
      data: (faqs) => ({ faqs }),
    });
  }

  listAllFaqs(_req, res) {
    return respond(res, {
      message: 'FAQs fetched',
      action: () => contentService.listFaqs({ includeUnpublished: true }),
      data: (faqs) => ({ faqs }),
    });
  }

  createFaq(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'FAQ created',
      action: () => contentService.createFaq(faqSchema.parse(req.body)),
      data: (faq) => ({ faq }),
    });
  }

  updateFaq(req, res) {
    return respond(res, {
      message: 'FAQ updated',
      action: () => contentService.updateFaq(req.params.id, updateFaqSchema.parse(req.body)),
      data: (faq) => ({ faq }),
    });
  }

  deleteFaq(req, res) {
    return respond(res, {
      message: 'FAQ deleted',
      action: () => contentService.deleteFaq(req.params.id),
    });
  }

  // ─── Testimonials ────────────────────────────────────────────────────────

  listTestimonials(_req, res) {
    return respond(res, {
      message: 'Testimonials fetched',
      action: () => contentService.listTestimonials(),
      data: (testimonials) => ({ testimonials }),
    });
  }

  listAllTestimonials(_req, res) {
    return respond(res, {
      message: 'Testimonials fetched',
      action: () => contentService.listTestimonials({ includeUnpublished: true }),
      data: (testimonials) => ({ testimonials }),
    });
  }

  createTestimonial(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Testimonial created',
      action: () => contentService.createTestimonial(testimonialSchema.parse(req.body)),
      data: (testimonial) => ({ testimonial }),
    });
  }

  updateTestimonial(req, res) {
    return respond(res, {
      message: 'Testimonial updated',
      action: () =>
        contentService.updateTestimonial(req.params.id, updateTestimonialSchema.parse(req.body)),
      data: (testimonial) => ({ testimonial }),
    });
  }

  deleteTestimonial(req, res) {
    return respond(res, {
      message: 'Testimonial deleted',
      action: () => contentService.deleteTestimonial(req.params.id),
    });
  }

  // ─── Support tickets ─────────────────────────────────────────────────────

  createTicket(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Support ticket created',
      action: () => supportService.createTicket(req.user.id, createTicketSchema.parse(req.body)),
      data: (ticket) => ({ ticket }),
    });
  }

  listMyTickets(req, res) {
    return respond(res, {
      message: 'Tickets fetched',
      action: () => supportService.listMyTickets(req.user.id),
      data: (tickets) => ({ tickets }),
    });
  }

  getTicket(req, res) {
    return respond(res, {
      message: 'Ticket fetched',
      action: () =>
        supportService.getTicket(req.user.id, req.params.id, {
          isAdmin: req.user.role === 'ADMIN',
        }),
      data: (ticket) => ({ ticket }),
    });
  }

  replyToTicket(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Reply sent',
      action: () =>
        supportService.replyToTicket(
          req.user.id,
          req.params.id,
          ticketReplySchema.parse(req.body).body,
          { isAdmin: req.user.role === 'ADMIN' }
        ),
      data: (ticket) => ({ ticket }),
    });
  }

  listAllTickets(req, res) {
    const { status, page, limit } = req.query;
    return respond(res, {
      message: 'Tickets fetched',
      action: () => supportService.listAllTickets({ status, page, limit }),
    });
  }

  updateTicketStatus(req, res) {
    return respond(res, {
      message: 'Ticket updated',
      action: () =>
        supportService.updateStatus(req.params.id, ticketStatusSchema.parse(req.body).status),
      data: (ticket) => ({ ticket }),
    });
  }
}

export default new ContentController();
