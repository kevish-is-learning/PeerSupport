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
  mentorIdParamSchema,
} from '../validators/mentorVerification.validator.js';
import { respondJson } from '../utils/controllerResponse.js';

const pagination = (query) => ({
  page: query.page ? Number.parseInt(query.page, 10) : 1,
  limit: query.limit ? Number.parseInt(query.limit, 10) : 20,
});

class AdminController {
  getDashboardStats(_req, res) {
    return respondJson(res, { action: () => adminDashboardService.getStats() });
  }

  listUsers(req, res) {
    const { search, role, isActive, provider } = req.query;
    return respondJson(res, {
      action: () => adminUserService.listUsers({
        ...pagination(req.query),
        search: search || undefined,
        role: role || undefined,
        isActive: isActive === 'true' ? true : isActive === 'false' ? false : undefined,
        provider: provider || undefined,
      }),
    });
  }

  getUserDetail(req, res) {
    return respondJson(res, { action: () => adminUserService.getUserDetail(req.params.userId) });
  }

  toggleUserActive(req, res) {
    return respondJson(res, {
      action: () => adminUserService.toggleUserActive(req.params.userId, req.body),
    });
  }

  listWaitlist(_req, res) {
    return respondJson(res, {
      action: () => mentorProfileService.listWaitlist(),
      data: (profiles) => ({ success: true, data: { profiles } }),
    });
  }

  updateApproval(req, res) {
    return respondJson(res, {
      action: () => mentorProfileService.updateApproval(req.params.profileId, req.body),
      data: (profile) => ({
        success: true,
        message: 'Mentor approval status updated',
        data: { profile },
      }),
    });
  }

  listMentors(req, res) {
    const { search, approvalStatus } = req.query;
    return respondJson(res, {
      action: () => adminMentorService.listMentors({
        ...pagination(req.query),
        search: search || undefined,
        approvalStatus: approvalStatus || undefined,
      }),
    });
  }

  getMentorDetail(req, res) {
    return respondJson(res, { action: () => adminMentorService.getMentorDetail(req.params.profileId) });
  }

  suspendMentor(req, res) {
    return respondJson(res, {
      action: () => adminMentorService.suspendMentor(req.params.profileId, req.body),
    });
  }

  unsuspendMentor(req, res) {
    return respondJson(res, { action: () => adminMentorService.unsuspendMentor(req.params.profileId) });
  }

  listBookings(req, res) {
    const { status, mentorProfileId, menteeId, from, to, search } = req.query;
    return respondJson(res, {
      action: () => adminBookingService.listBookings({
        ...pagination(req.query),
        status: status || undefined,
        mentorProfileId: mentorProfileId || undefined,
        menteeId: menteeId || undefined,
        from: from || undefined,
        to: to || undefined,
        search: search || undefined,
      }),
    });
  }

  getBookingDetail(req, res) {
    return respondJson(res, { action: () => adminBookingService.getBookingDetail(req.params.bookingId) });
  }

  overrideBookingStatus(req, res) {
    return respondJson(res, {
      action: () => adminBookingService.overrideStatus(req.params.bookingId, req.body),
    });
  }

  adminCancelBooking(req, res) {
    return respondJson(res, {
      action: () => adminBookingService.adminCancel(req.params.bookingId, req.body),
    });
  }

  listPayments(req, res) {
    const { status, from, to } = req.query;
    return respondJson(res, {
      action: () => adminPaymentService.listPayments({
        ...pagination(req.query),
        status: status || undefined,
        from: from || undefined,
        to: to || undefined,
      }),
    });
  }

  getRevenueSummary(_req, res) {
    return respondJson(res, { action: () => adminPaymentService.getRevenueSummary() });
  }

  adminRefund(req, res) {
    return respondJson(res, {
      action: () => adminPaymentService.adminRefund(req.params.paymentId, req.body),
    });
  }

  listReviews(req, res) {
    const { mentorProfileId, minRating, maxRating } = req.query;
    return respondJson(res, {
      action: () => adminReviewService.listReviews({
        ...pagination(req.query),
        mentorProfileId: mentorProfileId || undefined,
        minRating: minRating || undefined,
        maxRating: maxRating || undefined,
      }),
    });
  }

  deleteReview(req, res) {
    return respondJson(res, { action: () => adminReviewService.deleteReview(req.params.reviewId) });
  }

  listFeedback(req, res) {
    return respondJson(res, {
      action: () => adminReviewService.listFeedback(pagination(req.query)),
    });
  }

  adjustWallet(req, res) {
    return respondJson(res, {
      action: () => adminReviewService.adjustWallet(req.params.mentorProfileId, req.body),
    });
  }

  listPayouts(req, res) {
    const { status } = req.query;
    return respondJson(res, {
      action: () => payoutService.getAllPayouts({
        ...pagination(req.query),
        status: status || undefined,
      }),
    });
  }

  approvePayout(req, res) {
    return respondJson(res, { action: () => payoutService.approvePayout(req.params.payoutId) });
  }

  completePayout(req, res) {
    return respondJson(res, {
      action: () => payoutService.completePayout(req.params.payoutId, req.body),
    });
  }

  failPayout(req, res) {
    return respondJson(res, {
      action: () => payoutService.failPayout(req.params.payoutId, req.body),
    });
  }

  scheduleVerificationCall(req, res) {
    return respondJson(res, {
      action: () => mentorVerificationService.scheduleCall({
        ...scheduleCallSchema.parse(req.body),
        scheduledById: req.user.id,
      }),
    });
  }

  rescheduleVerificationCall(req, res) {
    return respondJson(res, {
      action: () => {
        const { callId } = callIdParamSchema.parse({ callId: req.params.callId });
        return mentorVerificationService.rescheduleCall(rescheduleCallSchema.parse({ callId, ...req.body }));
      },
    });
  }

  cancelVerificationCall(req, res) {
    return respondJson(res, {
      action: () => mentorVerificationService.cancelCall(
        callIdParamSchema.parse({ callId: req.params.callId }).callId,
      ),
    });
  }

  completeVerificationCall(req, res) {
    return respondJson(res, {
      action: () => mentorVerificationService.completeCall(
        callIdParamSchema.parse({ callId: req.params.callId }).callId,
      ),
    });
  }

  markVerificationNoShow(req, res) {
    return respondJson(res, {
      action: () => mentorVerificationService.markNoShow(
        callIdParamSchema.parse({ callId: req.params.callId }).callId,
      ),
    });
  }

  getVerificationCall(req, res) {
    return respondJson(res, {
      action: () => mentorVerificationService.getCallById(
        callIdParamSchema.parse({ callId: req.params.callId }).callId,
      ),
    });
  }

  getVerificationCallsForMentor(req, res) {
    return respondJson(res, {
      action: () => mentorVerificationService.getCallsForMentor(
        mentorIdParamSchema.parse({ mentorProfileId: req.params.mentorProfileId }).mentorProfileId,
      ),
    });
  }
}

export default new AdminController();
