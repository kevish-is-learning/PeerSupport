import mentorAnalyticsService from '../services/MentorAnalyticsService.js';
import { ApiResponse } from '../utils/apiResponse.js';

const getStatusCode = (error) => {
  if (error?.statusCode) return error.statusCode;
  if (error?.name === 'ZodError') return 400;
  return 500;
};

class MentorAnalyticsController {
  async getAnalytics(req, res) {
    try {
      const analytics = await mentorAnalyticsService.getFullAnalytics(req.user.mentorProfileId);
      return res.status(200).json(new ApiResponse(200, 'Analytics fetched', { analytics }));
    } catch (error) {
      console.error('Analytics error:', error);
      return res.status(getStatusCode(error)).json({ success: false, message: error.message });
    }
  }
}

export default new MentorAnalyticsController();
