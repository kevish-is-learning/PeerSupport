import publicMenteeService from '../services/PublicMenteeService.js';
import { ApiResponse } from '../utils/apiResponse.js';

class PublicMenteeController {
  async getMenteeProfile(req, res) {
    try {
      const { menteeId } = req.params;
      const mentee = await publicMenteeService.getMenteeProfile(menteeId);

      return res.status(200).json(
        new ApiResponse(200, 'Mentee profile fetched successfully', { mentee })
      );
    } catch (error) {
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch mentee profile',
      });
    }
  }
}

export default new PublicMenteeController();
