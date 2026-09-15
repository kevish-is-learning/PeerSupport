/**
 * SlotQuery Service (v2)
 *
 * GET /mentors/:id/slots?serviceId=&date=
 *
 * Generates available slots on-demand:
 * 1. Find the mentor's availability windows for the given date.
 * 2. Filter windows that offer the requested service.
 * 3. Get the service's duration and buffer config.
 * 4. Fetch all PENDING/CONFIRMED bookings for the mentor on that date.
 * 5. Run the slot generation algorithm.
 * 6. Return slots in IST.
 */

import { prisma } from '../../config/database.js';
import { slotsQuerySchema, mentorIdParamSchema } from '../../validators/v2.validator.js';
import { generateSlots } from '../../utils/slotGenerator.js';
import { dateTimeToTimeString, getDayOfWeekFromDate } from '../../utils/timeUtils.js';
import { istTimeAndDateToUtc, istToUtc, utcToIst } from '../../utils/timezoneUtils.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class SlotQueryService {
  /**
   * Generate available slots for a mentor + service + date.
   *
   * @param {string} mentorProfileId
   * @param {Object} query - { serviceId, date }
   * @returns {Promise<{ slots: Array<{ startTime: string, endTime: string }>, service: Object }>}
   */
  async getSlots(mentorProfileId, query) {
    const { id: validMentorId } = mentorIdParamSchema.parse({ id: mentorProfileId });
    const { serviceId, date } = slotsQuerySchema.parse(query);

    // 1. Verify the mentor profile exists
    const mentorProfile = await prisma.mentorProfile.findUnique({
      where: { id: validMentorId },
      select: { id: true, approvalStatus: true, isVerified: true },
    });

    if (!mentorProfile || mentorProfile.approvalStatus !== 'APPROVED' || !mentorProfile.isVerified) {
      throw createServiceError(404, 'Mentor not found');
    }

    // 2. Find the mentor's service config for the requested service
    const mentorService = await prisma.mentorService.findFirst({
      where: {
        mentorProfileId: validMentorId,
        id: serviceId,
        isActive: true,
      },
          });

    if (!mentorService) {
      throw createServiceError(404, 'This mentor does not offer this service or it is inactive');
    }

    // 3. Normalize the requested date
    const requestedDate = new Date(date + 'T00:00:00.000Z');

    // 4. Find matching availability windows.
    //    A date-specific window overrides the weekly schedule for that date, so
    //    the recurring fallback only applies when the date has no override at all.
    const dateOverrides = await prisma.availabilityWindow.findMany({
      where: { mentorProfileId: validMentorId, specificDate: requestedDate },
      orderBy: { startTime: 'asc' },
      include: { windowServices: { select: { mentorServiceId: true } } },
    });

    let windows;
    if (dateOverrides.length > 0) {
      windows = dateOverrides;
    } else {
      windows = await prisma.availabilityWindow.findMany({
        where: {
          mentorProfileId: validMentorId,
          dayOfWeek: getDayOfWeekFromDate(requestedDate),
        },
        orderBy: { startTime: 'asc' },
        include: { windowServices: { select: { mentorServiceId: true } } },
      });
    }

    windows = windows.filter((w) =>
      w.windowServices.some((ws) => ws.mentorServiceId === mentorService.id)
    );

    if (windows.length === 0) {
      return {
        slots: [],
        service: this._mapService(mentorService),
        date,
        message: 'No availability windows found for this service on this date',
      };
    }

    // 5. Fetch ALL PENDING/CONFIRMED bookings for this mentor on this date
    //    (cross-service — any booking blocks the mentor's time)
    const dateStart = istToUtc(`${date}T00:00:00`);
    const dateEnd = istToUtc(`${date}T23:59:59.999`);

    const existingBookings = await prisma.booking.findMany({
      where: {
        mentorProfileId: validMentorId,
        status: { in: ['PAYMENT_PENDING', 'CONFIRMED', 'IN_PROGRESS', 'RESCHEDULE_REQUESTED'] },
        startTime: { lt: dateEnd },
        endTime: { gt: dateStart },
      },
      select: {
        startTime: true,
        endTime: true,
      },
    });

    // 6. Generate slots from each window
    const allSlots = [];
    const now = new Date();

    for (const window of windows) {
      // Combine window's canonical time with the requested date
      const windowStart = istTimeAndDateToUtc(
        date,
        dateTimeToTimeString(window.startTime)
      );
      const windowEnd = istTimeAndDateToUtc(
        date,
        dateTimeToTimeString(window.endTime)
      );

      const slots = generateSlots(
        { startTime: windowStart, endTime: windowEnd },
        mentorService.durationMinutes,
        existingBookings,
        {
          bufferMinutes: mentorService.bufferMinutes,
          now,
          minLeadMinutes: 15,
        }
      );

      allSlots.push(...slots);
    }

    // 7. Sort and deduplicate by startTime
    allSlots.sort((a, b) => a.startTime - b.startTime);

    // 8. Convert to IST for output
    const slotsIST = allSlots.map((s) => ({
      startTime: utcToIst(s.startTime),
      endTime: utcToIst(s.endTime),
    }));

    return {
      slots: slotsIST,
      service: this._mapService(mentorService),
      date,
    };
  }

  _mapService(ms) {
    return {
      id: ms.id,
      serviceId: ms.id,
      serviceName: ms.title,
      serviceSlug: ms.title?.toLowerCase().replace(/\s+/g, '-'),
      price: ms.price,
      durationMinutes: ms.durationMinutes,
      bufferMinutes: ms.bufferMinutes,
    };
  }
}

export default new SlotQueryService();
