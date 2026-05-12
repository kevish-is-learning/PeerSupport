import { prisma } from '../config/database.js';
import { razorpayInstance } from '../config/razorpay.js';
import {
  createBookingSchema,
  cancelBookingSchema,
  availableSlotsQuerySchema,
  bookingIdParamSchema,
  mentorIdParamSchema,
} from '../validators/booking.validator.js';
import { generateSlots } from '../utils/slotGenerator.js';
import { istToUtc, utcToIst } from '../utils/timezoneUtils.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Map a raw Booking record to a clean API shape.
 */
function mapBooking(b) {
  return {
    id: b.id,
    status: b.status,
    startTime: b.startTime,
    endTime: b.endTime,
    meetingLink: b.meetingLink,
    purposeOfCall: b.purposeOfCall,
    notes: b.notes,
    cancelledReason: b.cancelledReason,
    service: b.mentorService
      ? {
          id: b.mentorService.id,
          serviceName: b.mentorService.service?.name,
          serviceSlug: b.mentorService.service?.slug,
          price: b.mentorService.price,
          durationMinutes: b.mentorService.durationMinutes,
        }
      : null,
    mentee: b.mentee
      ? {
          id: b.mentee.id,
          name: b.mentee.name,
          email: b.mentee.email,
          profilePicture: b.mentee.profilePicture,
        }
      : null,
    mentor: b.mentorProfile
      ? {
          id: b.mentorProfile.id,
          name: b.mentorProfile.user?.name,
          profilePicture: b.mentorProfile.user?.profilePicture,
        }
      : null,
    payment: b.payment
      ? {
          id: b.payment.id,
          amount: b.payment.amount,
          paymentStatus: b.payment.paymentStatus,
          paidAt: b.payment.paidAt,
          currency: b.payment.currency,
        }
      : null,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
}

const bookingInclude = {
  mentee: {
    select: { id: true, name: true, email: true, profilePicture: true },
  },
  mentorProfile: {
    include: {
      user: { select: { name: true, profilePicture: true } },
    },
  },
    payment: {
    select: { id: true, amount: true, paymentStatus: true, paidAt: true, currency: true },
  },
};

// ─── Service ─────────────────────────────────────────────────────────────────

class BookingService {
  /**
   * PUBLIC — Get available slots for a mentor, filtered by service and date.
   *
   * Uses the new on-demand slot generation from AvailabilityWindows.
   */
  async getAvailableSlots(mentorId, query) {
    const { mentorId: validMentorId } = mentorIdParamSchema.parse({ mentorId });
    const { serviceType: serviceSlug, date } = availableSlotsQuerySchema.parse(query);

    const requestedDate = new Date(date + 'T00:00:00.000Z');

    // Must be a future date (or today)
    if (requestedDate < new Date(new Date().toISOString().split('T')[0] + 'T00:00:00.000Z')) {
      throw createServiceError(400, 'Cannot book slots in the past');
    }

    // Find the mentor service for this slug
    const mentorService = await prisma.mentorService.findFirst({
      where: {
        mentorProfileId: validMentorId,
        service: { slug: serviceSlug },
        isActive: true,
      },
          });

    if (!mentorService) {
      throw createServiceError(404, 'This mentor does not offer this service');
    }

    // Get availability windows for this date
    const windows = await prisma.availabilityWindow.findMany({
      where: {
        mentorProfileId: validMentorId,
        specificDate: requestedDate,
        windowServices: {
          some: { mentorServiceId: mentorService.id },
        },
      },
    });

    if (windows.length === 0) {
      return { slots: [], message: 'Mentor is not available on this date' };
    }

    // Get existing bookings that could conflict
    const bookings = await prisma.booking.findMany({
      where: {
        mentorProfileId: validMentorId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        startTime: { gte: requestedDate },
        endTime: { lte: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000) },
      },
      select: { startTime: true, endTime: true },
    });

    // Generate slots using the on-demand generator
    const slots = generateSlots(windows, bookings, mentorService.durationMinutes, {
      bufferMinutes: mentorService.bufferMinutes || 0,
      leadTimeMinutes: 15,
      referenceDate: requestedDate,
    });

    return {
      slots: slots.map((s) => ({
        startTime: s.start.toISOString(),
        endTime: s.end.toISOString(),
        isAvailable: true,
      })),
      service: {
        id: mentorService.id,
        serviceName: mentorService.service?.name,
        serviceSlug: mentorService.service?.slug,
        price: mentorService.price,
        durationMinutes: mentorService.durationMinutes,
      },
      date,
    };
  }

  /**
   * POST — Initiate a booking with payment.
   */
  async initiateBooking(menteeId, payload) {
    const data = createBookingSchema.parse(payload);

    const startTimeUtc = new Date(data.startTime);
    const endTimeUtc = new Date(data.endTime);

    if (startTimeUtc <= new Date()) {
      throw createServiceError(400, 'Cannot book a slot in the past');
    }

    // Verify mentor service exists
    const service = await prisma.mentorService.findFirst({
      where: {
        id: data.mentorServiceId,
        mentorProfileId: data.mentorProfileId,
        isActive: true,
      },
          });

    if (!service) {
      throw createServiceError(404, 'Service not found or inactive');
    }

    // Prevent self-booking
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { id: data.mentorProfileId },
      select: { userId: true },
    });

    if (mentorProfile?.userId === menteeId) {
      throw createServiceError(400, 'You cannot book your own session');
    }

    // Check for conflicts
    const conflicting = await prisma.booking.findFirst({
      where: {
        mentorProfileId: data.mentorProfileId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        startTime: { lt: endTimeUtc },
        endTime: { gt: startTimeUtc },
      },
    });

    if (conflicting) {
      throw createServiceError(409, 'This slot is already booked');
    }

    // Create booking + payment in transaction
    const result = await prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          menteeId,
          mentorProfileId: data.mentorProfileId,
          mentorServiceId: data.mentorServiceId,
          startTime: startTimeUtc,
          endTime: endTimeUtc,
          purposeOfCall: data.purposeOfCall,
          notes: data.notes,
          status: 'PENDING',
        },
        include: bookingInclude,
      });

      const payment = await tx.payment.create({
        data: {
          bookingId: newBooking.id,
          amount: service.price,
          currency: 'INR',
          paymentStatus: 'PENDING',
        },
      });

      return { booking: newBooking, payment, service };
    });

    // Create Razorpay order
    const amountInPaise = Math.round(result.payment.amount * 100);

    const razorpayOrder = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: result.payment.currency || 'INR',
      receipt: `booking_${result.booking.id.substring(0, 8)}`,
      notes: {
        bookingId: result.booking.id,
        menteeId,
        serviceName: result.service?.service?.name || '',
      },
    });

    // Save Razorpay order ID
    await prisma.payment.update({
      where: { id: result.payment.id },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return {
      booking: mapBooking(result.booking),
      order: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        bookingId: result.booking.id,
        keyId: process.env.RAZORPAY_KEY_ID,
        prefill: {
          name: result.booking.mentee?.name,
          email: result.booking.mentee?.email,
        },
      },
    };
  }

  /**
   * POST — Cancel a booking.
   * Only PENDING or CONFIRMED bookings can be cancelled.
   */
  async cancelBooking(userId, bookingId, payload) {
    const { bookingId: validId } = bookingIdParamSchema.parse({ bookingId });
    const { cancelledReason } = cancelBookingSchema.parse(payload);

    const booking = await prisma.booking.findUnique({
      where: { id: validId },
      select: {
        id: true,
        menteeId: true,
        mentorProfileId: true,
        status: true,
        mentorProfile: { select: { userId: true } },
      },
    });

    if (!booking) throw createServiceError(404, 'Booking not found');

    // Only the mentee or mentor can cancel
    const isMentee = booking.menteeId === userId;
    const isMentor = booking.mentorProfile.userId === userId;
    if (!isMentee && !isMentor) {
      throw createServiceError(403, 'You are not authorized to cancel this booking');
    }

    if (!['PENDING', 'CONFIRMED'].includes(booking.status)) {
      throw createServiceError(400, `Cannot cancel a booking with status: ${booking.status}`);
    }

    const updated = await prisma.booking.update({
      where: { id: validId },
      data: {
        status: 'CANCELLED',
        cancelledReason,
      },
      include: bookingInclude,
    });

    return mapBooking(updated);
  }

  /**
   * GET — Get mentee's sessions (upcoming + past).
   */
  async getMenteeSessions(menteeId) {
    const bookings = await prisma.booking.findMany({
      where: { menteeId },
      include: bookingInclude,
      orderBy: { startTime: 'asc' },
    });

    const now = new Date();
    const upcoming = [];
    const past = [];

    bookings.forEach((b) => {
      const mapped = mapBooking(b);
      if (new Date(b.startTime) > now && b.status !== 'CANCELLED') {
        upcoming.push(mapped);
      } else {
        past.push(mapped);
      }
    });

    // Sort past by descending
    past.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));

    return { upcoming, past };
  }

  /**
   * GET — Get a single booking by ID (for mentee or mentor).
   */
  async getBookingById(userId, bookingId) {
    const { bookingId: validId } = bookingIdParamSchema.parse({ bookingId });

    const booking = await prisma.booking.findUnique({
      where: { id: validId },
      include: bookingInclude,
    });

    if (!booking) throw createServiceError(404, 'Booking not found');

    // Verify access: must be the mentee or the mentor
    const isMentee = booking.menteeId === userId;
    const isMentor = booking.mentorProfile?.userId === userId;
    if (!isMentee && !isMentor) {
      throw createServiceError(403, 'Not authorized to view this booking');
    }

    return mapBooking(booking);
  }
}

export default new BookingService();
