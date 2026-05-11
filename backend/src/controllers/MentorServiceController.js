import mentorServiceService from '../services/MentorServiceService.js';
import { ApiResponse } from '../utils/apiResponse.js';

const getStatusCode = (error) => {
  if (error?.statusCode) return error.statusCode;
  if (error?.name === 'ZodError') return 400;
  return 500;
};

class MentorServiceController {
  /**
   * GET /api/mentor-services/types
   * Public catalogue of available service types.
   */
  async getServiceTypes(_req, res) {
    try {
      const types = await mentorServiceService.getServiceTypes();
      return res.status(200).json(new ApiResponse(200, 'Service types fetched', { types }));
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch service types' });
    }
  }

  /**
   * GET /api/mentor-services
   * Fetch current mentor's services with pricing.
   */
  async getMyServices(req, res) {
    try {
      const services = await mentorServiceService.getByUserId(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Mentor services fetched', { services }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to fetch services',
      });
    }
  }

  /**
   * PUT /api/mentor-services
   * Bulk upsert services + pricing.
   */
  async upsertServices(req, res) {
    try {
      const services = await mentorServiceService.bulkUpsert(req.user.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Services updated successfully', { services }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to update services',
      });
    }
  }

  /**
   * DELETE /api/mentor-services/:serviceType
   * Remove a single service.
   */
  async deleteService(req, res) {
    try {
      const result = await mentorServiceService.deleteByType(req.user.id, req.params);
      return res.status(200).json(new ApiResponse(200, 'Service removed successfully', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: error.message || 'Failed to delete service',
      });
    }
  }
}

export default new MentorServiceController();
