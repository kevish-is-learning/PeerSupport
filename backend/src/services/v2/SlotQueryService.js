/**
 * SlotQuery Service (v2)
 *
 * GET /mentors/:id/slots?serviceId=&date=
 *
 * Generates available slots on-demand:
 * 1. Find the mentor's availability windows for the given date
 *    (recurring dayOfWeek OR specificDate match).
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
      select: { id: true },
    });

    if (!mentorProfile) {
      throw createServiceError(404, 'Mentor not found');
    }

    // 2. Find the mentor's service config for the requested service
    const mentorService = await prisma.mentorService.findFirst({
      where: {
        mentorProfileId: validMentorId,
        serviceId,
        isActive: true,
      },
      include: { service: true },
    });

    if (!mentorService) {
      throw createServiceError(404, 'This mentor does not offer this service or it is inactive');
    }

    // 3. Determine the day of week for the requested date
    const requestedDate = new Date(date + 'T00:00:00.000Z');
    const dayOfWeek = getDayOfWeekFromDate(requestedDate);

    // 4. Find matching availability windows
    //    Either: dayOfWeek matches OR specificDate matches
    const windows = await prisma.availabilityWindow.findMany({
      where: {
        mentorProfileId: validMentorId,
        OR: [
          { dayOfWeek },
          { specificDate: requestedDate },
        ],
        windowServices: {
          some: {
            mentorServiceId: mentorService.id,
          },
        },
      },
      orderBy: { startTime: 'asc' },
    });

    if (windows.length === 0) {
      return {
        slots: [],
        service: this._mapService(mentorService),
        date,
        dayOfWeek,
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
        status: { in: ['PENDING', 'CONFIRMED'] },
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
      dayOfWeek,
    };
  }

  _mapService(ms) {
    return {
      id: ms.id,
      serviceId: ms.serviceId,
      serviceName: ms.service?.name,
      serviceSlug: ms.service?.slug,
      price: ms.price,
      durationMinutes: ms.durationMinutes,
      bufferMinutes: ms.bufferMinutes,
    };
  }
}

export default new SlotQueryService();
