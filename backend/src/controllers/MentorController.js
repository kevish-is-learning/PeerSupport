import mentorService from "../services/MentorService.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { createSlotsSchema } from "../validators/mentor.validator.js";

class MentorController {
  ///////////////////////////
  // MENTOR APPLICATION
  ///////////////////////////

  // Submit mentor application
  async submitApplication(req, res) {
    try {
      const application = await mentorService.submitMentorApplication(
        req.user.id,
        req.body
      );

      res.status(201).json(
        new ApiResponse(true, "Mentor application submitted successfully", application)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to submit application")
      );
    }
  }

  // Update mentor application
  async updateApplication(req, res) {
    try {
      const application = await mentorService.updateMentorApplication(
        req.user.id,
        req.body
      );

      res.status(200).json(
        new ApiResponse(true, "Application updated successfully", application)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to update application")
      );
    }
  }

  // Get my application
  async getMyApplication(req, res) {
    try {
      const application = await mentorService.getUserMentorApplication(req.user.id);

      if (!application) {
        return res.status(404).json(
          new ApiResponse(false, "No application found", null)
        );
      }

      res.status(200).json(
        new ApiResponse(true, "Application retrieved successfully", application)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve application")
      );
    }
  }

  // Approve application (admin only)
  async approveApplication(req, res) {
    try {
      const { applicationId } = req.params;

      const result = await mentorService.approveMentorApplication(
        applicationId,
        req.user.id
      );

      res.status(200).json(
        new ApiResponse(true, "Application approved successfully", result)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to approve application")
      );
    }
  }

  ///////////////////////////
  // MENTOR PROFILE
  ///////////////////////////

  // Get mentor profile
  async getProfile(req, res) {
    try {
      const profile = await mentorService.getMentorProfile(req.user.id);

      res.status(200).json(
        new ApiResponse(true, "Profile retrieved successfully", profile)
      );
    } catch (error) {
      res.status(404).json(
        new ApiError(404, error.message || "Profile not found")
      );
    }
  }

  // Update mentor profile
  async updateProfile(req, res) {
    try {
      const profile = await mentorService.updateMentorProfile(
        req.user.id,
        req.body
      );

      res.status(200).json(
        new ApiResponse(true, "Profile updated successfully", profile)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to update profile")
      );
    }
  }

  // Check if can accept bookings
  async canAcceptBookings(req, res) {
    try {
      const result = await mentorService.canAcceptBookings(req.user.id);

      res.status(200).json(
        new ApiResponse(true, "Status checked", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to check status")
      );
    }
  }

  ///////////////////////////
  // SLOT MANAGEMENT
  ///////////////////////////

  // Create slots
  async createSlots(req, res) {
    try {
      // Validate input using Zod
      const { slots } = createSlotsSchema.parse(req.body);

      const createdSlots = await mentorService.createSlots(req.user.id, slots);

      res.status(201).json(
        new ApiResponse(true, "Slots created successfully", createdSlots)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to create slots")
      );
    }
  }

  // Get slots
  async getSlots(req, res) {
    try {
      const { status, startDate, endDate } = req.query;

      const slots = await mentorService.getSlots(req.user.id, {
        status,
        startDate,
        endDate,
      });

      res.status(200).json(
        new ApiResponse(true, "Slots retrieved successfully", slots)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve slots")
      );
    }
  }

  // Update slot
  async updateSlot(req, res) {
    try {
      const { slotId } = req.params;

      const slot = await mentorService.updateSlot(req.user.id, slotId, req.body);

      res.status(200).json(
        new ApiResponse(true, "Slot updated successfully", slot)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to update slot")
      );
    }
  }

  // Delete slot
  async deleteSlot(req, res) {
    try {
      const { slotId } = req.params;

      const result = await mentorService.deleteSlot(req.user.id, slotId);

      res.status(200).json(
        new ApiResponse(true, result.message, null)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to delete slot")
      );
    }
  }

  ///////////////////////////
  // BOOKINGS
  ///////////////////////////

  // Get bookings
  async getBookings(req, res) {
    try {
      const { status, page, limit } = req.query;

      const result = await mentorService.getBookings(req.user.id, {
        status,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
      });

      res.status(200).json(
        new ApiResponse(true, "Bookings retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve bookings")
      );
    }
  }

  // Reschedule booking
  async rescheduleBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const { newSlotId, reason } = req.body;

      if (!newSlotId) {
        return res.status(400).json(
          new ApiError(400, "New slot ID is required")
        );
      }

      const booking = await mentorService.rescheduleBooking(
        req.user.id,
        bookingId,
        newSlotId,
        reason
      );

      res.status(200).json(
        new ApiResponse(true, "Booking rescheduled successfully", booking)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to reschedule booking")
      );
    }
  }

  // Cancel booking
  async cancelBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const { reason } = req.body;

      const result = await mentorService.cancelBooking(
        req.user.id,
        bookingId,
        reason
      );

      res.status(200).json(
        new ApiResponse(true, "Booking cancelled successfully", result)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to cancel booking")
      );
    }
  }

  // Complete booking
  async completeBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const { mentorNotes } = req.body;

      const result = await mentorService.completeBooking(bookingId, mentorNotes);

      res.status(200).json(
        new ApiResponse(true, "Booking completed successfully", result)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to complete booking")
      );
    }
  }

  ///////////////////////////
  // DASHBOARD & ANALYTICS
  ///////////////////////////

  // Get dashboard stats
  async getDashboardStats(req, res) {
    try {
      const stats = await mentorService.getDashboardStats(req.user.id);

      res.status(200).json(
        new ApiResponse(true, "Dashboard stats retrieved successfully", stats)
      );
    } catch (error) {
      console.log(error)
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve dashboard stats")
      );
    }
  }

  // Get earnings history
  async getEarningsHistory(req, res) {
    try {
      const { page, limit, startDate, endDate } = req.query;

      const result = await mentorService.getEarningsHistory(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        startDate,
        endDate,
      });

      res.status(200).json(
        new ApiResponse(true, "Earnings history retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve earnings history")
      );
    }
  }

  // Get transactions
  async getTransactions(req, res) {
    try {
      const { page, limit, type } = req.query;

      const result = await mentorService.getTransactions(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        type,
      });

      res.status(200).json(
        new ApiResponse(true, "Transactions retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve transactions")
      );
    }
  }

  ///////////////////////////
  // WITHDRAWALS
  ///////////////////////////

  // Request withdrawal
  async requestWithdrawal(req, res) {
    try {
      const withdrawal = await mentorService.requestWithdrawal(
        req.user.id,
        req.body
      );

      res.status(201).json(
        new ApiResponse(true, "Withdrawal request submitted successfully", withdrawal)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to request withdrawal")
      );
    }
  }

  // Get withdrawals
  async getWithdrawals(req, res) {
    try {
      const { page, limit, status } = req.query;

      const result = await mentorService.getWithdrawals(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
      });

      res.status(200).json(
        new ApiResponse(true, "Withdrawals retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve withdrawals")
      );
    }
  }

  ///////////////////////////
  // INCENTIVES
  ///////////////////////////

  // Get incentives
  async getIncentives(req, res) {
    try {
      const { page, limit, status, type } = req.query;

      const result = await mentorService.getIncentives(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
        type,
      });

      res.status(200).json(
        new ApiResponse(true, "Incentives retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve incentives")
      );
    }
  }

  // Claim incentive
  async claimIncentive(req, res) {
    try {
      const { incentiveId } = req.params;

      const result = await mentorService.claimIncentive(req.user.id, incentiveId);

      res.status(200).json(
        new ApiResponse(true, "Incentive claimed successfully", result)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to claim incentive")
      );
    }
  }

  ///////////////////////////
  // RATINGS & REVIEWS
  ///////////////////////////

  // Get ratings and feedback
  async getRatingsAndFeedback(req, res) {
    try {
      const { page, limit } = req.query;

      const result = await mentorService.getRatingsAndFeedback(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
      });

      res.status(200).json(
        new ApiResponse(true, "Ratings retrieved successfully", result)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve ratings")
      );
    }
  }

  ///////////////////////////
  // RESUME MANAGEMENT
  ///////////////////////////

  // Add resume
  async addResume(req, res) {
    try {
      const resume = await mentorService.addResume(req.user.id, req.body);

      res.status(201).json(
        new ApiResponse(true, "Resume added successfully", resume)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to add resume")
      );
    }
  }

  // Get resumes
  async getResumes(req, res) {
    try {
      const resumes = await mentorService.getResumes(req.user.id);

      res.status(200).json(
        new ApiResponse(true, "Resumes retrieved successfully", resumes)
      );
    } catch (error) {
      res.status(500).json(
        new ApiError(500, error.message || "Failed to retrieve resumes")
      );
    }
  }

  // Delete resume
  async deleteResume(req, res) {
    try {
      const { resumeId } = req.params;

      const result = await mentorService.deleteResume(req.user.id, resumeId);

      res.status(200).json(
        new ApiResponse(true, result.message, null)
      );
    } catch (error) {
      res.status(400).json(
        new ApiError(400, error.message || "Failed to delete resume")
      );
    }
  }
}

export default new MentorController();
