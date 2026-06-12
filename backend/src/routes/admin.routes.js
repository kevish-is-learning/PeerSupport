/**
 * Admin Routes (Unified)
 *
 * All admin endpoints under /api/admin.
 * Every route requires: authenticateJWT + authorizeRoles('ADMIN')
 */

import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import adminController from '../controllers/AdminController.js';

const router = Router();

// All routes require admin auth
router.use(authenticateJWT, authorizeRoles('ADMIN'));

// ─── Dashboard ────────────────────────────────────────────────────────────────
router.get('/dashboard/stats', (req, res) => adminController.getDashboardStats(req, res));

// ─── Users ────────────────────────────────────────────────────────────────────
router.get('/users', (req, res) => adminController.listUsers(req, res));
router.get('/users/:userId', (req, res) => adminController.getUserDetail(req, res));
router.patch('/users/:userId', (req, res) => adminController.toggleUserActive(req, res));

// ─── Mentors ──────────────────────────────────────────────────────────────────
// Existing waitlist endpoints (preserved)
router.get('/mentor-waitlist', (req, res) => adminController.listWaitlist(req, res));
router.patch('/mentor-waitlist/:profileId', (req, res) => adminController.updateApproval(req, res));

// Enhanced mentor management
router.get('/mentors', (req, res) => adminController.listMentors(req, res));
router.get('/mentors/:profileId', (req, res) => adminController.getMentorDetail(req, res));
router.patch('/mentors/:profileId/suspend', (req, res) => adminController.suspendMentor(req, res));
router.patch('/mentors/:profileId/unsuspend', (req, res) => adminController.unsuspendMentor(req, res));

// ─── Bookings ─────────────────────────────────────────────────────────────────
router.get('/bookings', (req, res) => adminController.listBookings(req, res));
router.get('/bookings/:bookingId', (req, res) => adminController.getBookingDetail(req, res));
router.patch('/bookings/:bookingId/status', (req, res) => adminController.overrideBookingStatus(req, res));
router.patch('/bookings/:bookingId/cancel', (req, res) => adminController.adminCancelBooking(req, res));

// ─── Payments ─────────────────────────────────────────────────────────────────
router.get('/payments', (req, res) => adminController.listPayments(req, res));
router.get('/payments/summary', (req, res) => adminController.getRevenueSummary(req, res));
router.post('/payments/:paymentId/refund', (req, res) => adminController.adminRefund(req, res));

// ─── Reviews & Feedback ──────────────────────────────────────────────────────
router.get('/reviews', (req, res) => adminController.listReviews(req, res));
router.delete('/reviews/:reviewId', (req, res) => adminController.deleteReview(req, res));
router.get('/feedback', (req, res) => adminController.listFeedback(req, res));

// ─── Wallet Adjustments ──────────────────────────────────────────────────────
router.post('/wallet/:mentorProfileId/adjust', (req, res) => adminController.adjustWallet(req, res));

// ─── Payouts ──────────────────────────────────────────────────────────────────
router.get('/payouts', (req, res) => adminController.listPayouts(req, res));
router.patch('/payouts/:payoutId/approve', (req, res) => adminController.approvePayout(req, res));
router.patch('/payouts/:payoutId/complete', (req, res) => adminController.completePayout(req, res));
router.patch('/payouts/:payoutId/fail', (req, res) => adminController.failPayout(req, res));

// ─── Mentor Verification Calls ────────────────────────────────────────────────
router.post('/mentor-verification/schedule', (req, res) => adminController.scheduleVerificationCall(req, res));
router.patch('/mentor-verification/:callId/reschedule', (req, res) => adminController.rescheduleVerificationCall(req, res));
router.patch('/mentor-verification/:callId/cancel', (req, res) => adminController.cancelVerificationCall(req, res));
router.patch('/mentor-verification/:callId/complete', (req, res) => adminController.completeVerificationCall(req, res));
router.patch('/mentor-verification/:callId/no-show', (req, res) => adminController.markVerificationNoShow(req, res));
router.get('/mentor-verification/:callId', (req, res) => adminController.getVerificationCall(req, res));
router.get('/mentor-verification/mentor/:mentorProfileId', (req, res) => adminController.getVerificationCallsForMentor(req, res));

export default router;
