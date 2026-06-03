/**
 * Booking Service (v2)
 *
 * POST   /bookings          — create a booking with conflict guard
 * PATCH  /bookings/:id/cancel    — cancel a booking
 * PATCH  /bookings/:id/reschedule — reschedule with conflict guard
 * GET    /bookings/:id      — get a single booking
 */

import { prisma } from '../../config/database.js';
import {
  createBookingSchema,
  cancelBookingSchema,
  rescheduleBookingSchema,
  bookingIdParamSchema,
} from '../../validators/v2.validator.js';
import { createBookingWithGuard, rescheduleBookingWithGuard } from '../../utils/conflictGuard.js';
import { generateSlots } from '../../utils/slotGenerator.js';
import { dateTimeToTimeString } from '../../utils/timeUtils.js';
import { istTimeAndDateToUtc, istToUtc, utcToIst, utcToIstDateString } from '../../utils/timezoneUtils.js';
import { emitSlotUpdate } from '../../config/socket.js';
import { ACTIVE_STATUSES } from '../../utils/bookingStateMachine.js';
import { calculatePlatformFee, calculateMentorEarning } from '../../utils/financialCalculator.js';
import cancellationService from '../CancellationService.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

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

function mapBooking(b) {
  return {
    id: b.id,
    startTime: utcToIst(b.startTime),
    endTime: utcToIst(b.endTime),
    status: b.status,
    paymentId: b.paymentId,
    meetingLink: b.meetingLink,
    purposeOfCall: b.purposeOfCall,
    notes: b.notes,
    cancelledReason: b.cancelledReason,
    menteePhone: b.menteePhone,
    menteeEmail: b.menteeEmail,
    discussionTopic: b.discussionTopic,
    specificQuestions: b.specificQuestions,
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
    payment: b.payment || null,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
  };
}

class BookingServiceV2 {
  /**
   * POST /bookings
   *
   * Creates a booking with SELECT FOR UPDATE conflict guard.
   * Times are received in IST, converted to UTC for storage.
   */
  async createBooking(menteeId, payload) {
    const data = createBookingSchema.parse(payload);

    // Convert IST → UTC
    const startTimeUtc = istToUtc(data.startTime);
    const endTimeUtc = istToUtc(data.endTime);

    // Validate time is in the future
    const now = new Date();
    if (startTimeUtc <= now) {
      throw createServiceError(400, 'Cannot book a slot in the past');
    }

    // Verify mentor service exists and is active
    const mentorService = await prisma.mentorService.findFirst({
      where: {
        id: data.mentorServiceId,
        mentorProfileId: data.mentorProfileId,
        isActive: true,
      },
          });

    if (!mentorService) {
      throw createServiceError(404, 'Service not found or inactive for this mentor');
    }

    // Verify the slot duration matches the service config
    const expectedDuration = mentorService.durationMinutes * 60 * 1000;
    const actualDuration = endTimeUtc.getTime() - startTimeUtc.getTime();
    if (actualDuration !== expectedDuration) {
      throw createServiceError(
        400,
        `Slot duration must be ${mentorService.durationMinutes} minutes for this service`
      );
    }

    // Prevent self-booking
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { id: data.mentorProfileId },
      select: { userId: true },
    });
    if (mentorProfile?.userId === menteeId) {
      throw createServiceError(400, 'You cannot book your own session');
    }

    await this._assertSlotAvailable({
      mentorProfileId: data.mentorProfileId,
      mentorService,
      startTimeUtc,
      endTimeUtc,
    });

    // Create booking with conflict guard (SELECT FOR UPDATE)
    const booking = await createBookingWithGuard({
      menteeId,
      mentorProfileId: data.mentorProfileId,
      mentorServiceId: data.mentorServiceId,
      startTime: startTimeUtc,
      endTime: endTimeUtc,
      purposeOfCall: data.purposeOfCall,
      notes: data.notes,
      menteePhone: data.menteePhone,
      menteeEmail: data.menteeEmail,
      discussionTopic: data.discussionTopic,
      specificQuestions: data.specificQuestions,
    });

    // Create payment record
      const platformFee = calculatePlatformFee(mentorService.price);
      const mentorAmount = calculateMentorEarning(mentorService.price);

      const payment = await prisma.payment.create({
        data: {
          bookingId: booking.id,
          amount: mentorService.price,
          platformFee,
          mentorAmount,
          currency: 'INR',
          paymentStatus: 'PENDING',
        },
      });

    // Fetch the mentee for Razorpay prefill
    const mentee = await prisma.user.findUnique({
      where: { id: menteeId },
      select: { name: true, email: true },
    });

    // Create Razorpay order
    const amountInPaise = Math.round(payment.amount * 100);
    const { razorpayInstance } = await import('../../config/razorpay.js');

    let razorpayOrder;
    try {
      razorpayOrder = await razorpayInstance.orders.create({
        amount: amountInPaise,
        currency: payment.currency || 'INR',
        receipt: `booking_${booking.id.substring(0, 8)}`,
        notes: {
          bookingId: booking.id,
          menteeId,
          serviceName: mentorService.service?.name || '',
        },
      });

      // Save Razorpay order ID
      await prisma.payment.update({
        where: { id: payment.id },
        data: { razorpayOrderId: razorpayOrder.id },
      });
    } catch (err) {
      await prisma.$transaction([
        prisma.payment.update({
          where: { id: payment.id },
          data: { paymentStatus: 'FAILED' },
        }),
        prisma.booking.update({
          where: { id: booking.id },
          data: { status: 'CANCELLED_BY_MENTEE' },
        }),
      ]);

      emitSlotUpdate(data.mentorProfileId, {
        startTime: utcToIst(startTimeUtc),
        endTime: utcToIst(endTimeUtc),
        serviceId: data.mentorServiceId,
        action: 'released',
      });

      throw createServiceError(502, 'Failed to create payment order');
    }

    // Fetch the full booking with includes
    const fullBooking = await prisma.booking.findUnique({
      where: { id: booking.id },
      include: bookingInclude,
    });

    // Emit real-time slot update (taken)
    emitSlotUpdate(data.mentorProfileId, {
      startTime: utcToIst(startTimeUtc),
      endTime: utcToIst(endTimeUtc),
      serviceId: data.mentorServiceId,
      action: 'taken',
    });

    return {
      booking: mapBooking(fullBooking),
      bookingId: booking.id,
      order: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        bookingId: booking.id,
        keyId: process.env.RAZORPAY_KEY_ID,
        prefill: {
          name: mentee?.name,
          email: mentee?.email,
        },
      },
    };
  }

  /**
   * PATCH /bookings/:id/cancel
   * Both mentor and mentee can cancel — delegates to CancellationService.
   */
  async cancelBooking(userId, bookingId, payload = {}) {
    const { id: validId } = bookingIdParamSchema.parse({ id: bookingId });
    const { cancelledReason } = cancelBookingSchema.parse(payload);

    return cancellationService.cancelBooking(userId, validId, {
      reason: cancelledReason,
    });
  }

  /**
   * PATCH /bookings/:id/reschedule
   * Creates a child booking instead of mutating the original.
   * Original booking is marked RESCHEDULE_ACCEPTED.
   */
  async rescheduleBooking(userId, bookingId, payload) {
    const { id: validId } = bookingIdParamSchema.parse({ id: bookingId });
    const { startTime, endTime } = rescheduleBookingSchema.parse(payload);

    // Convert IST → UTC
    const newStartUtc = istToUtc(startTime);
    const newEndUtc = istToUtc(endTime);

    // Validate future time
    if (newStartUtc <= new Date()) {
      throw createServiceError(400, 'Cannot reschedule to a past time');
    }

    // Verify user is authorized (mentee or mentor)
    const existing = await prisma.booking.findUnique({
      where: { id: validId },
      include: {
        mentorProfile: { select: { userId: true } },
        mentorService: {
          select: {
            id: true,
            serviceId: true,
            durationMinutes: true,
            bufferMinutes: true,
            price: true,
          },
        },
        payment: true,
      },
    });

    if (!existing) throw createServiceError(404, 'Booking not found');

    const isMentee = existing.menteeId === userId;
    const isMentor = existing.mentorProfile.userId === userId;
    if (!isMentee && !isMentor) {
      throw createServiceError(403, 'Not authorized to reschedule this booking');
    }

    // Only CONFIRMED and PAYMENT_PENDING can be rescheduled
    if (!['PAYMENT_PENDING', 'CONFIRMED'].includes(existing.status)) {
      throw createServiceError(400, `Cannot reschedule a booking with status: ${existing.status}`);
    }

    if (!existing.mentorService) {
      throw createServiceError(404, 'Mentor service not found for this booking');
    }

    const expectedDuration = existing.mentorService.durationMinutes * 60 * 1000;
    const actualDuration = newEndUtc.getTime() - newStartUtc.getTime();
    if (actualDuration !== expectedDuration) {
      throw createServiceError(
        400,
        `Slot duration must be ${existing.mentorService.durationMinutes} minutes for this service`
      );
    }

    await this._assertSlotAvailable({
      mentorProfileId: existing.mentorProfileId,
      mentorService: existing.mentorService,
      startTimeUtc: newStartUtc,
      endTimeUtc: newEndUtc,
    });

    // Create child booking + mark original as rescheduled (atomic)
    const childBooking = await prisma.$transaction(async (tx) => {
      // 1. Mark original as RESCHEDULE_ACCEPTED
      await tx.booking.update({
        where: { id: validId },
        data: { status: 'RESCHEDULE_ACCEPTED' },
      });

      // 2. Create child booking with new times, linked to parent
      const child = await tx.booking.create({
        data: {
          menteeId: existing.menteeId,
          mentorProfileId: existing.mentorProfileId,
          mentorServiceId: existing.mentorServiceId,
          startTime: newStartUtc,
          endTime: newEndUtc,
          status: existing.status, // Keep same status (CONFIRMED or PAYMENT_PENDING)
          meetingLink: `/meeting/${existing.id}`, // Will be updated
          purposeOfCall: existing.purposeOfCall,
          notes: existing.notes,
          menteePhone: existing.menteePhone,
          menteeEmail: existing.menteeEmail,
          discussionTopic: existing.discussionTopic,
          specificQuestions: existing.specificQuestions,
          parentBookingId: validId,
        },
      });

      // 3. Transfer payment reference to child if it exists
      if (existing.payment) {
        await tx.payment.update({
          where: { id: existing.payment.id },
          data: { bookingId: child.id },
        });
      }

      // 4. Update child meeting link
      await tx.booking.update({
        where: { id: child.id },
        data: { meetingLink: `/meeting/${child.id}` },
      });

      return child;
    });

    // Emit slot updates
    emitSlotUpdate(existing.mentorProfileId, {
      startTime: utcToIst(existing.startTime),
      endTime: utcToIst(existing.endTime),
      serviceId: existing.mentorServiceId,
      action: 'released',
    });

    emitSlotUpdate(existing.mentorProfileId, {
      startTime: utcToIst(newStartUtc),
      endTime: utcToIst(newEndUtc),
      serviceId: existing.mentorServiceId,
      action: 'taken',
    });

    // Fetch full child booking
    const fullBooking = await prisma.booking.findUnique({
      where: { id: childBooking.id },
      include: bookingInclude,
    });

    return mapBooking(fullBooking);
  }

  async _assertSlotAvailable({ mentorProfileId, mentorService, startTimeUtc, endTimeUtc }) {
    const dateStr = utcToIstDateString(startTimeUtc);
    const requestedDate = new Date(`${dateStr}T00:00:00.000Z`);

    const windows = await prisma.availabilityWindow.findMany({
      where: {
        mentorProfileId,
        specificDate: requestedDate,
        windowServices: {
          some: {
            mentorServiceId: mentorService.id,
          },
        },
      },
      orderBy: { startTime: 'asc' },
    });

    if (windows.length === 0) {
      throw createServiceError(400, 'No availability windows found for this date');
    }

    const now = new Date();
    const slots = [];

    for (const window of windows) {
      const windowStart = istTimeAndDateToUtc(
        dateStr,
        dateTimeToTimeString(window.startTime)
      );
      const windowEnd = istTimeAndDateToUtc(
        dateStr,
        dateTimeToTimeString(window.endTime)
      );

      slots.push(
        ...generateSlots(
          { startTime: windowStart, endTime: windowEnd },
          mentorService.durationMinutes,
          [],
          {
            bufferMinutes: mentorService.bufferMinutes ?? 0,
            now,
            minLeadMinutes: 15,
          }
        )
      );
    }

    const match = slots.some(
      (s) =>
        s.startTime.getTime() === startTimeUtc.getTime() &&
        s.endTime.getTime() === endTimeUtc.getTime()
    );

    if (!match) {
      throw createServiceError(400, 'Selected slot is not available');
    }
  }

  /**
   * GET /bookings/:id
   */
  async getBookingById(userId, bookingId) {
    const { id: validId } = bookingIdParamSchema.parse({ id: bookingId });

    const booking = await prisma.booking.findUnique({
      where: { id: validId },
      include: bookingInclude,
    });

    if (!booking) throw createServiceError(404, 'Booking not found');

    const isMentee = booking.menteeId === userId;
    const isMentor = booking.mentorProfile?.userId === userId;
    if (!isMentee && !isMentor) {
      throw createServiceError(403, 'Not authorized to view this booking');
    }

    return mapBooking(booking);
  }
}

export default new BookingServiceV2();
