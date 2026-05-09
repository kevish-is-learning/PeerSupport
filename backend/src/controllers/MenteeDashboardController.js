import menteeDashboardService from '../services/MenteeDashboardService.js';
import { ApiResponse } from '../utils/apiResponse.js';

class MenteeDashboardController {
  async getDashboardData(req, res) {
    try {
      const menteeId = req.user.id;
      
      const stats = await menteeDashboardService.getDashboardStats(menteeId);
      const upcomingSessions = await menteeDashboardService.getUpcomingSessions(menteeId);
      const recommendedMentors = await menteeDashboardService.getRecommendedMentors();

      return res.status(200).json(
        new ApiResponse(200, 'Dashboard data fetched successfully', {
          stats,
          upcomingSessions,
          recommendedMentors,
        })
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch dashboard data',
      });
    }
  }
}

export default new MenteeDashboardController();
