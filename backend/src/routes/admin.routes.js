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

export default router;
