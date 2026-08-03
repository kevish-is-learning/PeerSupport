import slotQueryService from '../../services/v2/SlotQueryService.js';
import bookingService from '../../services/v2/BookingService.js';
import { respond } from '../../utils/controllerResponse.js';

const conflictDetails = (error) => (error.conflicts ? { conflicts: error.conflicts } : {});

class BookingController {
  getSlots(req, res) {
    return respond(res, {
      message: 'Available slots generated',
      action: () => slotQueryService.getSlots(req.params.id, req.query),
    });
  }

  createBooking(req, res) {
    return respond(res, {
      statusCode: 201,
      message: 'Booking created',
      action: () => bookingService.createBooking(req.user.id, req.body),
      error: { extras: conflictDetails },
    });
  }

  cancelBooking(req, res) {
    return respond(res, {
      message: 'Booking cancelled',
      action: () => bookingService.cancelBooking(req.user.id, req.params.id, req.body),
    });
  }

  rescheduleBooking(req, res) {
    return respond(res, {
      message: 'Booking rescheduled',
      action: () => bookingService.rescheduleBooking(req.user.id, req.params.id, req.body),
      data: (booking) => ({ booking }),
      error: { extras: conflictDetails },
    });
  }

  getBooking(req, res) {
    return respond(res, {
      message: 'Booking fetched',
      action: () => bookingService.getBookingById(req.user.id, req.params.id),
      data: (booking) => ({ booking }),
    });
  }
}

export default new BookingController();
