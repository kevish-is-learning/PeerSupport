import availabilityService from '../services/AvailabilityService.js';
import { ApiResponse } from '../utils/apiResponse.js';

const getStatusCode = (error) => {
  if (error?.statusCode) return error.statusCode;
  if (error?.name === 'ZodError') return 400;
  return 500;
};

const formatError = (error) => {
  if (error?.name === 'ZodError') {
    return error.issues?.map((i) => i.message).join('; ') || 'Validation failed';
  }
  return error.message || 'Internal server error';
};

class AvailabilityController {
  /**
   * GET /api/mentor-availability
   * Fetch current mentor's availability windows.
   */
  async getMyAvailability(req, res) {
    try {
      const availability = await availabilityService.getByUserId(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Availability fetched', { availability }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * PUT /api/mentor-availability
   * Bulk upsert availability windows.
   */
  async upsertAvailability(req, res) {
    try {
      const availability = await availabilityService.bulkUpsert(req.user.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Availability updated successfully', { availability }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * DELETE /api/mentor-availability/:dayOfWeek
   * Remove all availability for a specific day.
   */
  async deleteDay(req, res) {
    try {
      const result = await availabilityService.deleteByDay(req.user.id, req.params);
      return res.status(200).json(new ApiResponse(200, 'Day availability removed', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }
}

export default new AvailabilityController();
