import mentorProfileService from '../services/MentorProfileService.js';
import { ApiResponse } from '../utils/apiResponse.js';

const getStatusCode = (error) => {
  if (error?.statusCode) {
    return error.statusCode;
  }

  if (error?.name === 'ZodError') {
    return 400;
  }

  return 500;
};

class AdminMentorController {
  async listWaitlist(req, res) {
    try {
      const profiles = await mentorProfileService.listWaitlist();
      return res.status(200).json(new ApiResponse(200, 'Mentor waitlist fetched successfully', { profiles }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch mentor waitlist',
      });
    }
  }

  async updateApproval(req, res) {
    try {
      const profile = await mentorProfileService.updateApproval(req.params.profileId, req.body);
      return res.status(200).json(new ApiResponse(200, 'Mentor approval status updated successfully', { profile }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to update mentor approval status',
      });
    }
  }
}

export default new AdminMentorController();
