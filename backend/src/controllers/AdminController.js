/**
 * Unified Admin Controller
 *
 * Handles all admin API endpoints:
 * - Dashboard stats
 * - User management
 * - Mentor management (enhanced)
 * - Booking management
 * - Payment management
 * - Review moderation
 * - Wallet adjustments
 */

import adminDashboardService from '../services/AdminDashboardService.js';
import adminUserService from '../services/AdminUserService.js';
import adminMentorService from '../services/AdminMentorService.js';
import adminBookingService from '../services/AdminBookingService.js';
import adminPaymentService from '../services/AdminPaymentService.js';
import adminReviewService from '../services/AdminReviewService.js';
import mentorProfileService from '../services/MentorProfileService.js';
import payoutService from '../services/PayoutService.js';
import mentorVerificationService from '../services/MentorVerificationService.js';
import {
  scheduleCallSchema,
  rescheduleCallSchema,
  callIdParamSchema,
  mentorIdParamSchema
} from '../validators/mentorVerification.validator.js';

const handleError = (res, err) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

class AdminController {
  // ─── Dashboard ─────────────────────────────────────────────────────────────

  async getDashboardStats(req, res) {
    try {
      const stats = await adminDashboardService.getStats();
      res.json({ success: true, data: stats });
    } catch (err) {
      handleError(res, err);
    }
  }

  // ─── Users ─────────────────────────────────────────────────────────────────

  async listUsers(req, res) {
    try {
      const { page, limit, search, role, isActive, provider } = req.query;
      const result = await adminUserService.listUsers({
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        search: search || undefined,
        role: role || undefined,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
        provider: provider || undefined,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getUserDetail(req, res) {
    try {
      const result = await adminUserService.getUserDetail(req.params.userId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async toggleUserActive(req, res) {
    try {
      const result = await adminUserService.toggleUserActive(req.params.userId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  // ─── Mentors ───────────────────────────────────────────────────────────────

  async listWaitlist(req, res) {
    try {
      const profiles = await mentorProfileService.listWaitlist();
      res.json({ success: true, data: { profiles } });
    } catch (err) {
      handleError(res, err);
    }
  }

  async updateApproval(req, res) {
    try {
      const profile = await mentorProfileService.updateApproval(req.params.profileId, req.body);
      res.json({ success: true, message: 'Mentor approval status updated', data: { profile } });
    } catch (err) {
      handleError(res, err);
    }
  }

  async listMentors(req, res) {
    try {
      const { page, limit, search, approvalStatus } = req.query;
      const result = await adminMentorService.listMentors({
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        search: search || undefined,
        approvalStatus: approvalStatus || undefined,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getMentorDetail(req, res) {
    try {
      const result = await adminMentorService.getMentorDetail(req.params.profileId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async suspendMentor(req, res) {
    try {
      const result = await adminMentorService.suspendMentor(req.params.profileId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async unsuspendMentor(req, res) {
    try {
      const result = await adminMentorService.unsuspendMentor(req.params.profileId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  // ─── Bookings ──────────────────────────────────────────────────────────────

  async listBookings(req, res) {
    try {
      const { page, limit, status, mentorProfileId, menteeId, from, to, search } = req.query;
      const result = await adminBookingService.listBookings({
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        status: status || undefined,
        mentorProfileId: mentorProfileId || undefined,
        menteeId: menteeId || undefined,
        from: from || undefined,
        to: to || undefined,
        search: search || undefined,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getBookingDetail(req, res) {
    try {
      const result = await adminBookingService.getBookingDetail(req.params.bookingId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async overrideBookingStatus(req, res) {
    try {
      const result = await adminBookingService.overrideStatus(req.params.bookingId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async adminCancelBooking(req, res) {
    try {
      const result = await adminBookingService.adminCancel(req.params.bookingId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  // ─── Payments ──────────────────────────────────────────────────────────────

  async listPayments(req, res) {
    try {
      const { page, limit, status, from, to } = req.query;
      const result = await adminPaymentService.listPayments({
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        status: status || undefined,
        from: from || undefined,
        to: to || undefined,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getRevenueSummary(req, res) {
    try {
      const result = await adminPaymentService.getRevenueSummary();
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async adminRefund(req, res) {
    try {
      const result = await adminPaymentService.adminRefund(req.params.paymentId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  // ─── Reviews ───────────────────────────────────────────────────────────────

  async listReviews(req, res) {
    try {
      const { page, limit, mentorProfileId, minRating, maxRating } = req.query;
      const result = await adminReviewService.listReviews({
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
        mentorProfileId: mentorProfileId || undefined,
        minRating: minRating || undefined,
        maxRating: maxRating || undefined,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async deleteReview(req, res) {
    try {
      const result = await adminReviewService.deleteReview(req.params.reviewId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async listFeedback(req, res) {
    try {
      const { page, limit } = req.query;
      const result = await adminReviewService.listFeedback({
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  // ─── Wallet Adjustments ────────────────────────────────────────────────────

  async adjustWallet(req, res) {
    try {
      const result = await adminReviewService.adjustWallet(req.params.mentorProfileId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  // ─── Payouts (delegates to existing PayoutService) ─────────────────────────

  async listPayouts(req, res) {
    try {
      const { status, page, limit } = req.query;
      const result = await payoutService.getAllPayouts({
        status: status || undefined,
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : 20,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async approvePayout(req, res) {
    try {
      const result = await payoutService.approvePayout(req.params.payoutId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async completePayout(req, res) {
    try {
      const result = await payoutService.completePayout(req.params.payoutId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async failPayout(req, res) {
    try {
      const result = await payoutService.failPayout(req.params.payoutId, req.body);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  // ─── Mentor Verification Calls ─────────────────────────────────────────────

  async scheduleVerificationCall(req, res) {
    try {
      const validatedData = scheduleCallSchema.parse(req.body);
      const result = await mentorVerificationService.scheduleCall({
        ...validatedData,
        scheduledById: req.user.id,
      });
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async rescheduleVerificationCall(req, res) {
    try {
      const { callId } = callIdParamSchema.parse({ callId: req.params.callId });
      const validatedData = rescheduleCallSchema.parse({
        callId,
        ...req.body,
      });
      const result = await mentorVerificationService.rescheduleCall(validatedData);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async cancelVerificationCall(req, res) {
    try {
      const { callId } = callIdParamSchema.parse({ callId: req.params.callId });
      const result = await mentorVerificationService.cancelCall(callId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async completeVerificationCall(req, res) {
    try {
      const { callId } = callIdParamSchema.parse({ callId: req.params.callId });
      const result = await mentorVerificationService.completeCall(callId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async markVerificationNoShow(req, res) {
    try {
      const { callId } = callIdParamSchema.parse({ callId: req.params.callId });
      const result = await mentorVerificationService.markNoShow(callId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getVerificationCall(req, res) {
    try {
      const { callId } = callIdParamSchema.parse({ callId: req.params.callId });
      const result = await mentorVerificationService.getCallById(callId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }

  async getVerificationCallsForMentor(req, res) {
    try {
      const { mentorProfileId } = mentorIdParamSchema.parse({ mentorProfileId: req.params.mentorProfileId });
      const result = await mentorVerificationService.getCallsForMentor(mentorProfileId);
      res.json({ success: true, data: result });
    } catch (err) {
      handleError(res, err);
    }
  }
}

export default new AdminController();
