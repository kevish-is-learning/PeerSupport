/**
 * Booking Controller (v2)
 *
 * Handles:
 * - GET  /mentors/:id/slots?serviceId=&date=
 * - POST /bookings
 * - PATCH /bookings/:id/cancel
 * - PATCH /bookings/:id/reschedule
 * - GET  /bookings/:id
 */

import slotQueryService from '../../services/v2/SlotQueryService.js';
import bookingService from '../../services/v2/BookingService.js';
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

class BookingController {
  /**
   * GET /api/v2/mentors/:id/slots?serviceId=&date=
   * Public — generate available slots for a mentor.
   */
  async getSlots(req, res) {
    try {
      const result = await slotQueryService.getSlots(req.params.id, req.query);
      return res.status(200).json(new ApiResponse(200, 'Available slots generated', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({ success: false, message: formatError(error) });
    }
  }

  /**
   * POST /api/v2/bookings
   * Authenticated mentee — create a booking with conflict guard.
   */
  async createBooking(req, res) {
    try {
      const result = await bookingService.createBooking(req.user.id, req.body);
      return res.status(201).json(new ApiResponse(201, 'Booking created', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
        ...(error.conflicts ? { conflicts: error.conflicts } : {}),
      });
    }
  }

  /**
   * PATCH /api/v2/bookings/:id/cancel
   * Mentor only — cancel a booking.
   */
  async cancelBooking(req, res) {
    try {
      const booking = await bookingService.cancelBooking(req.user.id, req.params.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Booking cancelled', { booking }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({ success: false, message: formatError(error) });
    }
  }

  /**
   * PATCH /api/v2/bookings/:id/reschedule
   * Authenticated user — reschedule a booking with conflict guard.
   */
  async rescheduleBooking(req, res) {
    try {
      const booking = await bookingService.rescheduleBooking(req.user.id, req.params.id, req.body);
      return res.status(200).json(new ApiResponse(200, 'Booking rescheduled', { booking }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
        ...(error.conflicts ? { conflicts: error.conflicts } : {}),
      });
    }
  }

  /**
   * GET /api/v2/bookings/:id
   * Authenticated user — get a single booking.
   */
  async getBooking(req, res) {
    try {
      const booking = await bookingService.getBookingById(req.user.id, req.params.id);
      return res.status(200).json(new ApiResponse(200, 'Booking fetched', { booking }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({ success: false, message: formatError(error) });
    }
  }
}

export default new BookingController();
