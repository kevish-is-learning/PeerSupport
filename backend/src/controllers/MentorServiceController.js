import mentorServiceService from '../services/MentorServiceService.js';
import { respond } from '../utils/controllerResponse.js';

class MentorServiceController {
  getServiceTypes(_req, res) {
    return respond(res, {
      message: 'Service types fetched',
      action: () => mentorServiceService.getServiceTypes(),
      data: (types) => ({ types }),
      error: { fallback: 'Failed to fetch service types' },
    });
  }

  getMyServices(req, res) {
    return respond(res, {
      message: 'Mentor services fetched',
      action: () => mentorServiceService.getByUserId(req.user.id),
      data: (services) => ({ services }),
      error: { fallback: 'Failed to fetch services' },
    });
  }

  createService(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Service created successfully',
      action: () => mentorServiceService.createService(req.user.id, req.body),
      data: (service) => ({ service }),
      error: { fallback: 'Failed to create service' },
    });
  }

  updateService(req, res) {
    return respond(res, {
      message: 'Service updated successfully',
      action: () => mentorServiceService.updateService(req.user.id, req.params.id, req.body),
      data: (service) => ({ service }),
      error: { fallback: 'Failed to update service' },
    });
  }

  toggleActive(req, res) {
    return respond(res, {
      message: 'Service toggled successfully',
      action: () => mentorServiceService.toggleActive(req.user.id, req.params.id),
      data: (service) => ({ service }),
      error: { fallback: 'Failed to toggle service' },
    });
  }

  deleteService(req, res) {
    return respond(res, {
      message: 'Service removed successfully',
      action: () => mentorServiceService.deleteService(req.user.id, req.params.id),
      error: { fallback: 'Failed to delete service' },
    });
  }
}

export default new MentorServiceController();
