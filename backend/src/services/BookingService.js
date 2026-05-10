import { prisma } from '../config/database.js';
import {
  createBookingSchema,
  cancelBookingSchema,
  availableSlotsQuerySchema,
  bookingIdParamSchema,
  mentorIdParamSchema,
} from '../validators/booking.validator.js';
import {
  dateTimeToTimeString,
  combineDateAndTime,
  getDayOfWeekFromDate,
  isFutureDate,
} from '../utils/timeUtils.js';
import { SERVICE_TYPE_LABELS } from '../constants/services.js';

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
    sessionType: b.sessionType,
    bookingStatus: b.bookingStatus,
    scheduledDate: b.scheduledDate,
    startTime: b.startTime,
    endTime: b.endTime,
    meetingLink: b.meetingLink,
    purposeOfCall: b.purposeOfCall,
    notes: b.notes,
    isFeedbackSubmitted: b.isFeedbackSubmitted,
    service: b.mentorService
      ? {
          id: b.mentorService.id,
          serviceType: b.mentorService.serviceType,
          label: SERVICE_TYPE_LABELS[b.mentorService.serviceType],
          pricePerSession: b.mentorService.pricePerSession,
          durationMinutes: b.mentorService.durationMinutes,
        }
      : null,
    slot: b.availabilitySlot
      ? {
          id: b.availabilitySlot.id,
          startTime: dateTimeToTimeString(b.availabilitySlot.startTime),
          endTime: dateTimeToTimeString(b.availabilitySlot.endTime),
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
  mentorService: {
    select: { id: true, serviceType: true, pricePerSession: true, durationMinutes: true },
  },
  availabilitySlot: {
    select: { id: true, startTime: true, endTime: true },
  },
  payment: {
    select: { id: true, amount: true, paymentStatus: true, paidAt: true, currency: true },
  },
};

// ─── Service ─────────────────────────────────────────────────────────────────

class BookingService {
  /**
   * PUBLIC — Get available slots for a mentor, filtered by service type and date.
   *
   * Flow:
   * 1. Determine which DayOfWeek the requested date falls on.
   * 2. Find the mentor's WeeklyAvailability for that day.
   * 3. Find AvailabilitySlots that are:
   *    - active
   *    - have a SlotService mapping for the requested service type
   * 4. For each slot, count existing bookings on that date.
   * 5. Return slots with remaining capacity.
   */
  async getAvailableSlots(mentorId, query) {
    const { mentorId: validMentorId } = mentorIdParamSchema.parse({ mentorId });
    const { serviceType, date } = availableSlotsQuerySchema.parse(query);

    const requestedDate = new Date(date + 'T00:00:00.000Z');

    // Must be a future date (or today)
    if (!isFutureDate(requestedDate)) {
      throw createServiceError(400, 'Cannot book slots in the past');
    }

    const dayOfWeek = getDayOfWeekFromDate(requestedDate);

    // Find the mentor's service of this type
    const mentorService = await prisma.mentorService.findFirst({
      where: {
        mentorProfileId: validMentorId,
        serviceType,
        isActive: true,
      },
      select: { id: true, pricePerSession: true, durationMinutes: true },
    });

    if (!mentorService) {
      throw createServiceError(404, 'This mentor does not offer this service');
    }

    // Find the day's availability
    const dayAvailability = await prisma.weeklyAvailability.findUnique({
      where: {
        mentorProfileId_dayOfWeek: {
          mentorProfileId: validMentorId,
          dayOfWeek,
        },
      },
      select: { id: true, isAvailable: true },
    });

    if (!dayAvailability || !dayAvailability.isAvailable) {
      return { slots: [], message: 'Mentor is not available on this day' };
    }

    // Find all active slots that support this service
    const slots = await prisma.availabilitySlot.findMany({
      where: {
        weeklyAvailabilityId: dayAvailability.id,
        isActive: true,
        slotServices: {
          some: {
            mentorServiceId: mentorService.id,
          },
        },
      },
      include: {
        // Count bookings for this date (non-cancelled)
        bookings: {
          where: {
            scheduledDate: requestedDate,
            bookingStatus: { notIn: ['CANCELLED', 'EXPIRED', 'REFUNDED'] },
          },
          select: { id: true },
        },
      },
      orderBy: { startTime: 'asc' },
    });

    const availableSlots = slots
      .map((slot) => {
        const currentBookings = slot.bookings.length;
        const remainingCapacity = slot.maxBookings - currentBookings;

        return {
          id: slot.id,
          startTime: dateTimeToTimeString(slot.startTime),
          endTime: dateTimeToTimeString(slot.endTime),
          maxBookings: slot.maxBookings,
          currentBookings,
          remainingCapacity,
          isAvailable: remainingCapacity > 0,
        };
      })
      .filter((s) => s.isAvailable); // Only return slots with remaining capacity

    return {
      slots: availableSlots,
      service: {
        id: mentorService.id,
        serviceType,
        label: SERVICE_TYPE_LABELS[serviceType],
        pricePerSession: mentorService.pricePerSession,
        durationMinutes: mentorService.durationMinutes,
      },
      date,
      dayOfWeek,
    };
  }

  /**
   * POST — Create a new booking.
   *
   * TRANSACTION with race condition prevention:
   * 1. Verify all entities exist and are valid.
   * 2. Verify SlotService mapping (the service is offered in this slot).
   * 3. Lock the slot row (SELECT FOR UPDATE equivalent via transaction isolation).
   * 4. Count existing non-cancelled bookings for this slot + date.
   * 5. If capacity full → reject.
   * 6. Create Booking with resolved start/end times.
   * 7. Create Payment (PENDING).
   *
   * The @@unique([menteeId, availabilitySlotId, scheduledDate]) constraint
   * prevents duplicate bookings at the database level as a final guard.
   */
  async createBooking(menteeId, payload) {
    const data = createBookingSchema.parse(payload);

    const scheduledDate = new Date(data.scheduledDate + 'T00:00:00.000Z');

    if (!isFutureDate(scheduledDate)) {
      throw createServiceError(400, 'Cannot book a slot in the past');
    }

    // Verify the scheduled date matches the slot's day of week
    const targetDayOfWeek = getDayOfWeekFromDate(scheduledDate);

    const booking = await prisma.$transaction(async (tx) => {
      // 1. Verify the slot exists and is active
      const slot = await tx.availabilitySlot.findUnique({
        where: { id: data.availabilitySlotId },
        include: {
          weeklyAvailability: {
            select: { mentorProfileId: true, dayOfWeek: true, isAvailable: true },
          },
        },
      });

      if (!slot || !slot.isActive) {
        throw createServiceError(404, 'This slot is not available');
      }

      if (!slot.weeklyAvailability.isAvailable) {
        throw createServiceError(400, 'Mentor is not available on this day');
      }

      // Verify the slot's day matches the scheduled date
      if (slot.weeklyAvailability.dayOfWeek !== targetDayOfWeek) {
        throw createServiceError(
          400,
          `Scheduled date ${data.scheduledDate} is a ${targetDayOfWeek}, but this slot is for ${slot.weeklyAvailability.dayOfWeek}`
        );
      }

      // Verify the slot belongs to the correct mentor
      if (slot.weeklyAvailability.mentorProfileId !== data.mentorProfileId) {
        throw createServiceError(400, 'Slot does not belong to this mentor');
      }

      // 2. Verify the service exists and is active
      const service = await tx.mentorService.findFirst({
        where: {
          id: data.mentorServiceId,
          mentorProfileId: data.mentorProfileId,
          isActive: true,
        },
        select: { id: true, pricePerSession: true },
      });

      if (!service) {
        throw createServiceError(404, 'Service not found or inactive');
      }

      // 3. Verify the SlotService mapping exists (this service is offered in this slot)
      const slotServiceMapping = await tx.slotService.findUnique({
        where: {
          availabilitySlotId_mentorServiceId: {
            availabilitySlotId: data.availabilitySlotId,
            mentorServiceId: data.mentorServiceId,
          },
        },
      });

      if (!slotServiceMapping) {
        throw createServiceError(
          400,
          'This service is not offered in the selected time slot'
        );
      }

      // 4. Count existing bookings for this slot + date (non-cancelled)
      const existingCount = await tx.booking.count({
        where: {
          availabilitySlotId: data.availabilitySlotId,
          scheduledDate,
          bookingStatus: { notIn: ['CANCELLED', 'EXPIRED', 'REFUNDED'] },
        },
      });

      if (existingCount >= slot.maxBookings) {
        throw createServiceError(409, 'This slot is fully booked for the selected date');
      }

      // 5. Prevent self-booking
      const mentorProfile = await tx.mentorProfile.findUnique({
        where: { id: data.mentorProfileId },
        select: { userId: true },
      });

      if (mentorProfile?.userId === menteeId) {
        throw createServiceError(400, 'You cannot book your own session');
      }

      // 6. Resolve real start/end DateTimes from slot time + scheduled date
      const startTime = combineDateAndTime(scheduledDate, slot.startTime);
      const endTime = combineDateAndTime(scheduledDate, slot.endTime);

      // 7. Create the booking
      const newBooking = await tx.booking.create({
        data: {
          menteeId,
          mentorProfileId: data.mentorProfileId,
          mentorServiceId: data.mentorServiceId,
          availabilitySlotId: data.availabilitySlotId,
          scheduledDate,
          sessionType: data.sessionType,
          startTime,
          endTime,
          purposeOfCall: data.purposeOfCall,
          notes: data.notes,
          sharedResume: data.sharedResume,
        },
        include: bookingInclude,
      });

      // 8. Create PENDING payment
      await tx.payment.create({
        data: {
          bookingId: newBooking.id,
          amount: service.pricePerSession,
          currency: 'INR',
          paymentStatus: 'PENDING',
        },
      });

      return newBooking;
    });

    return mapBooking(booking);
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
        bookingStatus: true,
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

    if (!['PENDING', 'CONFIRMED'].includes(booking.bookingStatus)) {
      throw createServiceError(400, `Cannot cancel a booking with status: ${booking.bookingStatus}`);
    }

    const updated = await prisma.booking.update({
      where: { id: validId },
      data: {
        bookingStatus: 'CANCELLED',
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
      if (new Date(b.startTime) > now && b.bookingStatus !== 'CANCELLED') {
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
