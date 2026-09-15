/**
 * Admin Routes (Unified)
 *
 * All admin endpoints under /api/admin.
 * Every route requires: authenticateJWT + authorizeRoles('ADMIN')
 */

import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import adminController from '../controllers/AdminController.js';
import contentController from '../controllers/ContentController.js';
import groupSessionController from '../controllers/GroupSessionController.js';

const router = Router();

// All routes require admin auth
router.use(authenticateJWT, authorizeRoles('ADMIN'));

// ─── Dashboard ────────────────────────────────────────────────────────────────
router.get('/dashboard/stats', adminController.getDashboardStats);

// ─── Users ────────────────────────────────────────────────────────────────────
router.get('/users', adminController.listUsers);
router.get('/users/:userId', adminController.getUserDetail);
router.patch('/users/:userId', adminController.toggleUserActive);

// ─── Mentors ──────────────────────────────────────────────────────────────────
// Existing waitlist endpoints (preserved)
router.get('/mentor-waitlist', adminController.listWaitlist);
router.patch('/mentor-waitlist/:profileId', adminController.updateApproval);

// Enhanced mentor management
router.get('/mentors', adminController.listMentors);
router.get('/mentors/:profileId', adminController.getMentorDetail);
router.patch('/mentors/:profileId/suspend', adminController.suspendMentor);
router.patch('/mentors/:profileId/unsuspend', adminController.unsuspendMentor);

// ─── Bookings ─────────────────────────────────────────────────────────────────
router.get('/bookings', adminController.listBookings);
router.get('/bookings/:bookingId', adminController.getBookingDetail);
router.patch('/bookings/:bookingId/status', adminController.overrideBookingStatus);
router.patch('/bookings/:bookingId/cancel', adminController.adminCancelBooking);

// ─── Payments ─────────────────────────────────────────────────────────────────
router.get('/payments', adminController.listPayments);
router.get('/payments/summary', adminController.getRevenueSummary);
router.post('/payments/:paymentId/refund', adminController.adminRefund);

// ─── Reviews & Feedback ──────────────────────────────────────────────────────
router.get('/reviews', adminController.listReviews);
router.delete('/reviews/:reviewId', adminController.deleteReview);
router.get('/feedback', adminController.listFeedback);

// ─── Wallet Adjustments ──────────────────────────────────────────────────────
router.post('/wallet/:mentorProfileId/adjust', adminController.adjustWallet);

// ─── Payouts ──────────────────────────────────────────────────────────────────
router.get('/payouts', adminController.listPayouts);
router.patch('/payouts/:payoutId/approve', adminController.approvePayout);
router.patch('/payouts/:payoutId/complete', adminController.completePayout);
router.patch('/payouts/:payoutId/fail', adminController.failPayout);

// ─── Mentor Verification Calls ────────────────────────────────────────────────
router.post('/mentor-verification/schedule', adminController.scheduleVerificationCall);
router.patch('/mentor-verification/:callId/reschedule', adminController.rescheduleVerificationCall);
router.patch('/mentor-verification/:callId/cancel', adminController.cancelVerificationCall);
router.patch('/mentor-verification/:callId/complete', adminController.completeVerificationCall);
router.patch('/mentor-verification/:callId/no-show', adminController.markVerificationNoShow);
router.get('/mentor-verification/:callId', adminController.getVerificationCall);
router.get('/mentor-verification/mentor/:mentorProfileId', adminController.getVerificationCallsForMentor);

// ─── Content: Blog / FAQ / Testimonials ──────────────────────────────────────
router.get('/content/posts', contentController.listAllPosts);
router.post('/content/posts', contentController.createPost);
router.patch('/content/posts/:id', contentController.updatePost);
router.delete('/content/posts/:id', contentController.deletePost);

router.get('/content/faqs', contentController.listAllFaqs);
router.post('/content/faqs', contentController.createFaq);
router.patch('/content/faqs/:id', contentController.updateFaq);
router.delete('/content/faqs/:id', contentController.deleteFaq);

router.get('/content/testimonials', contentController.listAllTestimonials);
router.post('/content/testimonials', contentController.createTestimonial);
router.patch('/content/testimonials/:id', contentController.updateTestimonial);
router.delete('/content/testimonials/:id', contentController.deleteTestimonial);

// ─── Support ─────────────────────────────────────────────────────────────────
router.get('/support/tickets', contentController.listAllTickets);
router.get('/support/tickets/:id', contentController.getTicket);
router.post('/support/tickets/:id/reply', contentController.replyToTicket);
router.patch('/support/tickets/:id/status', contentController.updateTicketStatus);

// ─── Webinars ────────────────────────────────────────────────────────────────
router.get('/webinars', groupSessionController.listAllWebinars);
router.post('/webinars', groupSessionController.createWebinar);
router.patch('/webinars/:id', groupSessionController.updateWebinar);
router.delete('/webinars/:id', groupSessionController.deleteWebinar);

// ─── Group Discussions ───────────────────────────────────────────────────────
router.get('/group-discussions', groupSessionController.listAllDiscussions);
router.post('/group-discussions', groupSessionController.createDiscussion);
router.patch('/group-discussions/:id', groupSessionController.updateDiscussion);
router.delete('/group-discussions/:id', groupSessionController.deleteDiscussion);

export default router;
