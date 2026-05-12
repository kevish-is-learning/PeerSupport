/**
 * Mentor Controller (v2)
 *
 * Handles:
 * - PUT /mentor/services
 * - GET /mentor/services
 * - GET /services (catalogue)
 * - PUT /mentor/availability
 * - GET /mentor/availability
 */

import mentorServiceConfigService from '../../services/v2/MentorServiceConfigService.js';
import availabilityWindowService from '../../services/v2/AvailabilityWindowService.js';
import { ApiResponse } from '../../utils/apiResponse.js';

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

class MentorController {
  // ─── Service Catalogue ───────────────────────────────────────────────

  /** GET /api/v2/services — list all seeded services */
  async getAllServices(req, res) {
    try {
      const services = await mentorServiceConfigService.getAllServices();
      return res.status(200).json(new ApiResponse(200, 'Services fetched', { services }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({ success: false, message: formatError(error) });
    }
  }

  // ─── Mentor Service Config ────────────────────────────────────────────

  /** GET /api/v2/mentor/services */
  async getMentorServices(req, res) {
    try {
      const services = await mentorServiceConfigService.getMentorServices(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Mentor services fetched', { services }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({ success: false, message: formatError(error) });
    }
  }

  /** PUT /api/v2/mentor/services */
  async upsertMentorServices(req, res) {
    try {
      const services = await mentorServiceConfigService.upsertServices(req.user.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Services updated', { services }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  // ─── Availability Windows ────────────────────────────────────────────

  /** GET /api/v2/mentor/availability */
  async getAvailability(req, res) {
    try {
      const windows = await availabilityWindowService.getWindows(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Availability fetched', { windows }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({ success: false, message: formatError(error) });
    }
  }

  /** PUT /api/v2/mentor/availability */
  async upsertAvailability(req, res) {
    try {
      const windows = await availabilityWindowService.upsertWindows(req.user.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Availability updated', { windows }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
        ...(error.data || {}),
      });
    }
  }

  /** PUT /api/v2/mentor/availability/dates/:date */
  async replaceAvailabilityForDate(req, res) {
    try {
      const windows = await availabilityWindowService.replaceDateWindows(
        req.user.id,
        req.params.date,
        req.body
      );
      return res.status(200).json(new ApiResponse(200, 'Availability updated', { windows }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
        ...(error.data || {}),
      });
    }
  }

  /** POST /api/v2/mentor/availability/windows */
  async createAvailabilityWindow(req, res) {
    try {
      const window = await availabilityWindowService.createWindow(req.user.id, req.body);
      return res.status(201).json(new ApiResponse(201, 'Availability window created', { window }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
        ...(error.data || {}),
      });
    }
  }

  /** PATCH /api/v2/mentor/availability/windows/:id */
  async updateAvailabilityWindow(req, res) {
    try {
      const window = await availabilityWindowService.updateWindow(
        req.user.id,
        req.params.id,
        req.body
      );
      return res.status(200).json(new ApiResponse(200, 'Availability window updated', { window }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
        ...(error.data || {}),
      });
    }
  }

  /** DELETE /api/v2/mentor/availability/windows/:id */
  async deleteAvailabilityWindow(req, res) {
    try {
      const result = await availabilityWindowService.deleteWindow(req.user.id, req.params.id);
      return res.status(200).json(new ApiResponse(200, 'Availability window deleted', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
        ...(error.data || {}),
      });
    }
  }
}

export default new MentorController();
