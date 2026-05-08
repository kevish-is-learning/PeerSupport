import mentorAvailabilityService from '../services/MentorAvailabilityService.js';
import { ApiResponse } from '../utils/apiResponse.js';

const getStatusCode = (error) => {
  if (error?.statusCode) return error.statusCode;
  if (error?.name === 'ZodError') return 400;
  return 500;
};

class MentorAvailabilityController {
  /**
   * GET /api/mentor-availability
   * Fetch current mentor's weekly availability.
   */
  async getMyAvailability(req, res) {
    try {
      const availability = await mentorAvailabilityService.getByUserId(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Availability fetched', { availability }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch availability',
      });
    }
  }

  /**
   * PUT /api/mentor-availability
   * Bulk upsert weekly availability.
   */
  async upsertAvailability(req, res) {
    try {
      const availability = await mentorAvailabilityService.bulkUpsert(req.user.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Availability updated successfully', { availability }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to update availability',
      });
    }
  }

  /**
   * DELETE /api/mentor-availability/:dayOfWeek
   * Remove all availability for a specific day.
   */
  async deleteDay(req, res) {
    try {
      const result = await mentorAvailabilityService.deleteByDay(req.user.id, req.params);
      return res.status(200).json(new ApiResponse(200, 'Day availability removed', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to delete availability',
      });
    }
  }
}

export default new MentorAvailabilityController();
