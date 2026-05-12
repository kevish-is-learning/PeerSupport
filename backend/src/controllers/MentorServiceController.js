import mentorServiceService from '../services/MentorServiceService.js';
import { ApiResponse } from '../utils/apiResponse.js';

const getStatusCode = (error) => {
  if (error?.statusCode) return error.statusCode;
  if (error?.name === 'ZodError') return 400;
  return 500;
};

class MentorServiceController {
  /** GET /api/mentor-services/types — Public catalogue */
  async getServiceTypes(_req, res) {
    try {
      const types = await mentorServiceService.getServiceTypes();
      return res.status(200).json(new ApiResponse(200, 'Service types fetched', { types }));
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch service types' });
    }
  }

  /** GET /api/mentor-services — Current mentor's services */
  async getMyServices(req, res) {
    try {
      const services = await mentorServiceService.getByUserId(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Mentor services fetched', { services }));
    } catch (error) {
      const sc = getStatusCode(error);
      return res.status(sc).json({ success: false, message: error.message || 'Failed to fetch services' });
    }
  }

  /** POST /api/mentor-services — Create a new custom service */
  async createService(req, res) {
    try {
      const service = await mentorServiceService.createService(req.user.id, req.body);
      return res.status(201).json(new ApiResponse(201, 'Service created successfully', { service }));
    } catch (error) {
      const sc = getStatusCode(error);
      return res.status(sc).json({ success: false, message: error.message || 'Failed to create service' });
    }
  }

  /** PUT /api/mentor-services/:id — Update a service */
  async updateService(req, res) {
    try {
      const service = await mentorServiceService.updateService(req.user.id, req.params.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Service updated successfully', { service }));
    } catch (error) {
      const sc = getStatusCode(error);
      return res.status(sc).json({ success: false, message: error.message || 'Failed to update service' });
    }
  }

  /** PATCH /api/mentor-services/:id/toggle — Toggle active/inactive */
  async toggleActive(req, res) {
    try {
      const service = await mentorServiceService.toggleActive(req.user.id, req.params.id);
      return res.status(200).json(new ApiResponse(200, 'Service toggled successfully', { service }));
    } catch (error) {
      const sc = getStatusCode(error);
      return res.status(sc).json({ success: false, message: error.message || 'Failed to toggle service' });
    }
  }

  /** DELETE /api/mentor-services/:id — Delete a service */
  async deleteService(req, res) {
    try {
      const result = await mentorServiceService.deleteService(req.user.id, req.params.id);
      return res.status(200).json(new ApiResponse(200, 'Service removed successfully', result));
    } catch (error) {
      const sc = getStatusCode(error);
      return res.status(sc).json({ success: false, message: error.message || 'Failed to delete service' });
    }
  }
}

export default new MentorServiceController();
