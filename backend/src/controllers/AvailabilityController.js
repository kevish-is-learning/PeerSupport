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
   * Fetch current mentor's weekly availability with slots and services.
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
   * Bulk upsert weekly availability (days + slots + service mappings).
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
   * POST /api/mentor-availability/:dayId/slots
   * Add a single slot to an existing day.
   */
  async addSlot(req, res) {
    try {
      const slot = await availabilityService.addSlotToDay(req.user.id, req.params.dayId, req.body);
      return res.status(201).json(new ApiResponse(201, 'Slot added', { slot }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * PUT /api/mentor-availability/slots/:slotId
   * Update an existing slot.
   */
  async updateSlot(req, res) {
    try {
      const slot = await availabilityService.updateSlot(req.user.id, req.params.slotId, req.body);
      return res.status(200).json(new ApiResponse(200, 'Slot updated', { slot }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * DELETE /api/mentor-availability/slots/:slotId
   * Delete a single slot.
   */
  async deleteSlot(req, res) {
    try {
      const result = await availabilityService.deleteSlot(req.user.id, req.params.slotId);
      return res.status(200).json(new ApiResponse(200, 'Slot deleted', result));
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
