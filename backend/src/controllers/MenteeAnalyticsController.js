import menteeAnalyticsService from '../services/MenteeAnalyticsService.js';
import { ApiResponse } from '../utils/apiResponse.js';

class MenteeAnalyticsController {
  async getAnalytics(req, res) {
    try {
      const menteeId = req.user.id;
      const analytics = await menteeAnalyticsService.getFullAnalytics(menteeId);

      return res.status(200).json(
        new ApiResponse(200, 'Mentee analytics fetched successfully', analytics)
      );
    } catch (error) {
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch mentee analytics',
      });
    }
  }
}

export default new MenteeAnalyticsController();
