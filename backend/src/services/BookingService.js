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
import emailService from './EmailService.js';
import { ACTIVE_STATUSES } from '../utils/bookingStateMachine.js';
import { calculatePlatformFee, calculateMentorEarning } from '../utils/financialCalculator.js';

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
        status: { in: ACTIVE_STATUSES },
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
        status: { in: ACTIVE_STATUSES },
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
          status: 'PAYMENT_PENDING',
        },
        include: bookingInclude,
      });

      const platformFee = calculatePlatformFee(service.price);
      const mentorAmount = calculateMentorEarning(service.price);

      const payment = await tx.payment.create({
        data: {
          bookingId: newBooking.id,
          amount: service.price,
          platformFee,
          mentorAmount,
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

    if (!['PAYMENT_PENDING', 'CONFIRMED'].includes(booking.status)) {
      throw createServiceError(400, `Cannot cancel a booking with status: ${booking.status}`);
    }

    const cancelStatus = isMentee ? 'CANCELLED_BY_MENTEE' : 'CANCELLED_BY_MENTOR';

    const updated = await prisma.booking.update({
      where: { id: validId },
      data: {
        status: cancelStatus,
        cancelledReason,
        cancelledBy: userId,
      },
      include: {
        ...bookingInclude,
        mentorProfile: {
          include: {
            user: { select: { name: true, email: true, profilePicture: true } },
          },
        },
        mentorService: {
          select: { title: true, durationMinutes: true, price: true },
        },
      },
    });

    // Fire-and-forget: send cancellation emails to both parties
    const menteeEmail = updated.mentee?.email;
    const mentorEmail = updated.mentorProfile?.user?.email;
    if (menteeEmail || mentorEmail) {
      emailService.sendBookingCancelledEmails({
        menteeEmail,
        menteeName: updated.mentee?.name || 'Mentee',
        mentorEmail,
        mentorName: updated.mentorProfile?.user?.name || 'Mentor',
        serviceName: updated.mentorService?.title || 'Mentoring Session',
        startTime: updated.startTime,
        endTime: updated.endTime,
        cancelledReason,
        cancelledByRole: isMentee ? 'mentee' : 'mentor',
        bookingId: updated.id,
      });
    }

    return mapBooking(updated);
  }

  /**
   * GET — Get mentee's sessions (upcoming + past).
   * Two parallel DB queries with DB-side filtering & sorting.
   * Uses select (not include) to pull only what the frontend needs.
   */
  async getMenteeSessions(menteeId) {
    const now = new Date();

    const sessionSelect = {
      id: true,
      status: true,
      startTime: true,
      endTime: true,
      meetingLink: true,
      purposeOfCall: true,
      notes: true,
      menteePhone: true,
      menteeEmail: true,
      discussionTopic: true,
      specificQuestions: true,
      cancelledReason: true,
      createdAt: true,
      mentorService: {
        select: { id: true, title: true, durationMinutes: true, price: true },
      },
      mentorProfile: {
        select: {
          id: true,
          user: { select: { name: true, profilePicture: true } },
        },
      },
      payment: {
        select: { id: true, amount: true, paymentStatus: true, paidAt: true, currency: true },
      },
      review: {
        select: { id: true, rating: true, review: true, createdAt: true },
      },
      feedback: {
        select: { id: true, strengths: true, weaknesses: true, recommendations: true, createdAt: true },
      },
    };

    const [upcomingRaw, pastRaw] = await Promise.all([
      // Upcoming: confirmed + future, ascending
      prisma.booking.findMany({
        where: {
          menteeId,
          status: { in: ['CONFIRMED', 'PAYMENT_PENDING', 'IN_PROGRESS'] },
          endTime: { gt: now },
        },
        select: sessionSelect,
        orderBy: { startTime: 'asc' },
      }),
      // Past: completed/cancelled or past confirmed, descending
      prisma.booking.findMany({
        where: {
          menteeId,
          OR: [
            { status: { in: ['COMPLETED', 'CANCELLED_BY_MENTOR', 'CANCELLED_BY_MENTEE'] } },
            { status: { in: ['CONFIRMED', 'IN_PROGRESS'] }, endTime: { lte: now } },
          ],
        },
        select: sessionSelect,
        orderBy: { startTime: 'desc' },
      }),
    ]);

    const mapSession = (b) => ({
      id: b.id,
      status: b.status,
      mentorName: b.mentorProfile?.user?.name || 'Mentor',
      mentorPicture: b.mentorProfile?.user?.profilePicture || null,
      mentorProfileId: b.mentorProfile?.id || null,
      serviceType: b.mentorService?.title || 'Session',
      durationMinutes: b.mentorService?.durationMinutes || 60,
      price: b.mentorService?.price || 0,
      startTime: b.startTime,
      endTime: b.endTime,
      meetingLink: b.meetingLink,
      purposeOfCall: b.purposeOfCall,
      notes: b.notes,
      menteePhone: b.menteePhone,
      menteeEmail: b.menteeEmail,
      discussionTopic: b.discussionTopic,
      specificQuestions: b.specificQuestions,
      cancelledReason: b.cancelledReason,
      payment: b.payment || null,
      review: b.review || null,
      feedback: b.feedback || null,
      createdAt: b.createdAt,
    });

    return {
      upcoming: upcomingRaw.map(mapSession),
      past: pastRaw.map(mapSession),
    };
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
