/**
 * Feedback Routes — /api/feedback
 *
 * Mentors write post-session feedback; mentees read it and download it as a PDF.
 */

import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import feedbackController from '../controllers/FeedbackController.js';

const router = Router();

router.use(authenticateJWT);

// Collections — declared before /:bookingId so they aren't swallowed by it.
router.get('/received', feedbackController.listReceived);
router.get('/given', authorizeRoles('MENTOR'), feedbackController.listGiven);
router.get('/pending', authorizeRoles('MENTOR'), feedbackController.listPending);
router.get('/history/:counterpartId', feedbackController.getHistory);

// Per-session
router.post('/:bookingId', authorizeRoles('MENTOR'), feedbackController.submitFeedback);
router.get('/:bookingId', feedbackController.getFeedback);
router.get('/:bookingId/pdf', feedbackController.downloadFeedbackPdf);

export default router;
