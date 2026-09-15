/**
 * Content Routes — /api/content
 *
 * Public reads for blog, FAQ and testimonials; authenticated support tickets.
 * Admin authoring lives under /api/admin/content.
 */

import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import contentController from '../controllers/ContentController.js';

const router = Router();

// ─── Public ──────────────────────────────────────────────────────────────────

router.get('/posts', contentController.listPosts);
router.get('/posts/tags', contentController.listTags);
router.get('/posts/:slug', contentController.getPost);

router.get('/faqs', contentController.listFaqs);
router.get('/testimonials', contentController.listTestimonials);

// ─── Support tickets (authenticated) ─────────────────────────────────────────

router.post('/support/tickets', authenticateJWT, contentController.createTicket);
router.get('/support/tickets', authenticateJWT, contentController.listMyTickets);
router.get('/support/tickets/:id', authenticateJWT, contentController.getTicket);
router.post('/support/tickets/:id/reply', authenticateJWT, contentController.replyToTicket);

export default router;
