import availabilityService from '../services/AvailabilityService.js';
import { respond } from '../utils/controllerResponse.js';

class AvailabilityController {
  getMyAvailability(req, res) {
    return respond(res, {
      message: 'Availability fetched',
      action: () => availabilityService.getByUserId(req.user.id),
      data: (availability) => ({ availability }),
    });
  }

  upsertAvailability(req, res) {
    return respond(res, {
      message: 'Availability updated successfully',
      action: () => availabilityService.bulkUpsert(req.user.id, req.body),
      data: (availability) => ({ availability }),
    });
  }

  deleteDate(req, res) {
    return respond(res, {
      message: 'Date availability removed',
      action: () => availabilityService.deleteByDate(req.user.id, req.params),
    });
  }
}

export default new AvailabilityController();
