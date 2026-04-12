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

class MentorProfileController {
  async getMyProfile(req, res) {
    try {
      const profile = await mentorProfileService.getByUserId(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Mentor profile fetched successfully', { profile }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch mentor profile',
      });
    }
  }

  async createMyProfile(req, res) {
    try {
      const profile = await mentorProfileService.create(req.user.id, {
        ...req.body,
        ...req.uploadedFiles,
      });
      return res.status(201).json(new ApiResponse(201, 'Mentor profile created successfully', { profile }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to create mentor profile',
      });
    }
  }

  async updateMyProfile(req, res) {
    try {
      const profile = await mentorProfileService.update(req.user.id, {
        ...req.body,
        ...req.uploadedFiles,
      });
      return res.status(200).json(new ApiResponse(200, 'Mentor profile updated successfully', { profile }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to update mentor profile',
      });
    }
  }

  async deleteMyProfile(req, res) {
    try {
      await mentorProfileService.delete(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Mentor profile deleted successfully'));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to delete mentor profile',
      });
    }
  }
}

export default new MentorProfileController();
