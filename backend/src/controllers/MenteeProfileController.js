import menteeProfileService from '../services/MenteeProfileService.js';
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

class MenteeProfileController {
  async getMyProfile(req, res) {
    try {
      const profile = await menteeProfileService.getByUserId(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Mentee profile fetched successfully', { profile }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch mentee profile',
      });
    }
  }

  async createMyProfile(req, res) {
    try {
      const profile = await menteeProfileService.create(req.user.id, req.body);
      return res.status(201).json(new ApiResponse(201, 'Mentee profile created successfully', { profile }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to create mentee profile',
      });
    }
  }

  async updateMyProfile(req, res) {
    try {
      const profile = await menteeProfileService.update(req.user.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Mentee profile updated successfully', { profile }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to update mentee profile',
      });
    }
  }

  async deleteMyProfile(req, res) {
    try {
      await menteeProfileService.delete(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Mentee profile deleted successfully'));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to delete mentee profile',
      });
    }
  }
}

export default new MenteeProfileController();
