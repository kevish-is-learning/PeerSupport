import mentorBookingService from '../services/MentorBookingService.js';
import { ApiResponse } from '../utils/apiResponse.js';

const getStatusCode = (error) => {
  if (error?.statusCode) return error.statusCode;
  if (error?.name === 'ZodError') return 400;
  return 500;
};

class MentorBookingController {
  async getDashboardStats(req, res) {
    try {
      const stats = await mentorBookingService.getDashboardStats(req.user.mentorProfileId);
      return res.status(200).json(new ApiResponse(200, 'Dashboard stats fetched', { stats }));
    } catch (error) {
      return res.status(getStatusCode(error)).json({ success: false, message: error.message });
    }
  }

  async listMentees(req, res) {
    try {
      const mentees = await mentorBookingService.listMentees(req.user.mentorProfileId);
      return res.status(200).json(new ApiResponse(200, 'Mentees fetched', { mentees }));
    } catch (error) {
      return res.status(getStatusCode(error)).json({ success: false, message: error.message });
    }
  }

  async listBookingsForMentee(req, res) {
    try {
      const bookings = await mentorBookingService.listBookingsForMentee(
        req.user.mentorProfileId,
        req.params.menteeId
      );
      return res.status(200).json(new ApiResponse(200, 'Bookings fetched', { bookings }));
    } catch (error) {
      return res.status(getStatusCode(error)).json({ success: false, message: error.message });
    }
  }

  async getEarnings(req, res) {
    try {
      const earnings = await mentorBookingService.getEarnings(req.user.mentorProfileId);
      return res.status(200).json(new ApiResponse(200, 'Earnings fetched', { earnings }));
    } catch (error) {
      return res.status(getStatusCode(error)).json({ success: false, message: error.message });
    }
  }
}

export default new MentorBookingController();
