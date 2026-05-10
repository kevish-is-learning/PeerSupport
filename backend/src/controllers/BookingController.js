import bookingService from '../services/BookingService.js';
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

class BookingController {
  /**
   * GET /api/mentors/:mentorId/available-slots?serviceType=X&date=YYYY-MM-DD
   * Public (or authenticated) — fetch available slots for a mentor.
   */
  async getAvailableSlots(req, res) {
    try {
      const result = await bookingService.getAvailableSlots(req.params.mentorId, req.query);
      return res.status(200).json(new ApiResponse(200, 'Available slots fetched', result));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * POST /api/bookings
   * Authenticated mentee — create a new booking.
   */
  async createBooking(req, res) {
    try {
      const booking = await bookingService.createBooking(req.user.id, req.body);
      return res.status(201).json(new ApiResponse(201, 'Booking created successfully', { booking }));
    } catch (error) {
      // Handle unique constraint violation (duplicate booking)
      if (error.code === 'P2002') {
        return res.status(409).json({
          success: false,
          message: 'You already have a booking for this slot on this date',
        });
      }
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * POST /api/bookings/:bookingId/cancel
   * Authenticated user (mentee or mentor) — cancel a booking.
   */
  async cancelBooking(req, res) {
    try {
      const booking = await bookingService.cancelBooking(req.user.id, req.params.bookingId, req.body);
      return res.status(200).json(new ApiResponse(200, 'Booking cancelled', { booking }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * GET /api/mentee-bookings/my-sessions
   * Authenticated mentee — get upcoming + past sessions.
   */
  async getMySessions(req, res) {
    try {
      const sessions = await bookingService.getMenteeSessions(req.user.id);
      return res.status(200).json(new ApiResponse(200, 'Sessions fetched', sessions));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }

  /**
   * GET /api/bookings/:bookingId
   * Authenticated user — get a single booking.
   */
  async getBooking(req, res) {
    try {
      const booking = await bookingService.getBookingById(req.user.id, req.params.bookingId);
      return res.status(200).json(new ApiResponse(200, 'Booking fetched', { booking }));
    } catch (error) {
      const statusCode = getStatusCode(error);
      return res.status(statusCode).json({
        success: false,
        message: formatError(error),
      });
    }
  }
}

export default new BookingController();
