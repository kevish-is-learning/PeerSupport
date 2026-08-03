import mentorServiceConfigService from '../../services/v2/MentorServiceConfigService.js';
import availabilityWindowService from '../../services/v2/AvailabilityWindowService.js';
import { respond } from '../../utils/controllerResponse.js';

const availabilityErrorDetails = (error) => error.data || {};

class MentorController {
  getAllServices(_req, res) {
    return respond(res, {
      message: 'Services fetched',
      action: () => mentorServiceConfigService.getAllServices(),
      data: (services) => ({ services }),
    });
  }

  getMentorServices(req, res) {
    return respond(res, {
      message: 'Mentor services fetched',
      action: () => mentorServiceConfigService.getMentorServices(req.user.id),
      data: (services) => ({ services }),
    });
  }

  upsertMentorServices(req, res) {
    return respond(res, {
      message: 'Services updated',
      action: () => mentorServiceConfigService.upsertServices(req.user.id, req.body),
      data: (services) => ({ services }),
    });
  }

  getAvailability(req, res) {
    return respond(res, {
      message: 'Availability fetched',
      action: () => availabilityWindowService.getWindows(req.user.id),
      data: (windows) => ({ windows }),
    });
  }

  upsertAvailability(req, res) {
    return respond(res, {
      message: 'Availability updated',
      action: () => availabilityWindowService.upsertWindows(req.user.id, req.body),
      data: (windows) => ({ windows }),
      error: { extras: availabilityErrorDetails },
    });
  }

  replaceAvailabilityForDate(req, res) {
    return respond(res, {
      message: 'Availability updated',
      action: () => availabilityWindowService.replaceDateWindows(req.user.id, req.params.date, req.body),
      data: (windows) => ({ windows }),
      error: { extras: availabilityErrorDetails },
    });
  }

  createAvailabilityWindow(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Availability window created',
      action: () => availabilityWindowService.createWindow(req.user.id, req.body),
      data: (window) => ({ window }),
      error: { extras: availabilityErrorDetails },
    });
  }

  updateAvailabilityWindow(req, res) {
    return respond(res, {
      message: 'Availability window updated',
      action: () => availabilityWindowService.updateWindow(req.user.id, req.params.id, req.body),
      data: (window) => ({ window }),
      error: { extras: availabilityErrorDetails },
    });
  }

  deleteAvailabilityWindow(req, res) {
    return respond(res, {
      message: 'Availability window deleted',
      action: () => availabilityWindowService.deleteWindow(req.user.id, req.params.id),
      error: { extras: availabilityErrorDetails },
    });
  }
}

export default new MentorController();
