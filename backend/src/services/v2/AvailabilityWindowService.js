/**
 * AvailabilityWindow Service (v2)
 *
 * PUT /mentor/availability — save AvailabilityWindow + AvailabilityWindowService rows.
 * Before saving, checks if any CONFIRMED/PENDING bookings conflict with windows
 * being deleted or changed — returns 409 with conflicting bookings listed.
 */

import { prisma } from '../../config/database.js';
import { upsertAvailabilitySchema } from '../../validators/v2.validator.js';
import { timeStringToDateTime, dateTimeToTimeString } from '../../utils/timeUtils.js';

const createServiceError = (statusCode, message, data) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  if (data) error.data = data;
  return error;
};

async function requireMentorProfile(userId) {
  const profile = await prisma.mentorProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!profile) throw createServiceError(404, 'Mentor profile not found');
  return profile;
}

class AvailabilityWindowService {
  /**
   * GET — Fetch all availability windows for a mentor.
   */
  async getWindows(userId) {
    const profile = await requireMentorProfile(userId);

    const windows = await prisma.availabilityWindow.findMany({
      where: { mentorProfileId: profile.id },
      include: {
        windowServices: {
          include: {
            mentorService: {
              include: { service: true },
            },
          },
        },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    return windows.map(this._mapWindow);
  }

  /**
   * GET — Fetch windows for a specific mentor by profile ID (public).
   */
  async getWindowsByMentorId(mentorProfileId) {
    const windows = await prisma.availabilityWindow.findMany({
      where: { mentorProfileId },
      include: {
        windowServices: {
          include: {
            mentorService: {
              include: { service: true },
            },
          },
        },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });

    return windows.map(this._mapWindow);
  }

  /**
   * PUT /mentor/availability — Bulk replace availability windows.
   *
   * Flow:
   * 1. Check for conflicting bookings that fall inside windows being removed.
   * 2. Delete all existing windows for this mentor.
   * 3. Create new windows + window-service mappings.
   */
  async upsertWindows(userId, payload) {
    const { windows: incoming } = upsertAvailabilitySchema.parse(payload);
    const profile = await requireMentorProfile(userId);
    const profileId = profile.id;

    // Validate that all mentorServiceIds belong to this mentor
    const allMsIds = [...new Set(incoming.flatMap((w) => w.mentorServiceIds))];
    if (allMsIds.length > 0) {
      const validMs = await prisma.mentorService.findMany({
        where: { mentorProfileId: profileId, id: { in: allMsIds }, isActive: true },
        select: { id: true },
      });
      const validIds = new Set(validMs.map((m) => m.id));
      const invalid = allMsIds.filter((id) => !validIds.has(id));
      if (invalid.length > 0) {
        throw createServiceError(400, `Invalid or inactive mentor service IDs: ${invalid.join(', ')}`);
      }
    }

    // Check for conflicting bookings
    const existingWindows = await prisma.availabilityWindow.findMany({
      where: { mentorProfileId: profileId },
    });

    if (existingWindows.length > 0) {
      // Find all PENDING/CONFIRMED bookings for this mentor
      const activeBookings = await prisma.booking.findMany({
        where: {
          mentorProfileId: profileId,
          status: { in: ['PENDING', 'CONFIRMED'] },
        },
        select: {
          id: true,
          startTime: true,
          endTime: true,
          status: true,
          mentorService: {
            include: { service: true },
          },
        },
      });

      if (activeBookings.length > 0) {
        // Check if any active booking falls inside a window being removed/changed.
        // We compare each booking against the NEW windows to see if it would still be valid.
        const orphanedBookings = activeBookings.filter((booking) => {
          // A booking is orphaned if no incoming window covers its time range
          return !incoming.some((w) => {
            return this._bookingFitsWindow(booking, w);
          });
        });

        if (orphanedBookings.length > 0) {
          throw createServiceError(
            409,
            `Cannot update availability: ${orphanedBookings.length} active booking(s) would be orphaned. Cancel them first.`,
            {
              conflictingBookings: orphanedBookings.map((b) => ({
                bookingId: b.id,
                startTime: b.startTime,
                endTime: b.endTime,
                status: b.status,
                service: b.mentorService?.service?.name,
              })),
            }
          );
        }
      }
    }

    // Perform the atomic replace
    const result = await prisma.$transaction(async (tx) => {
      // Delete all existing windows (cascade deletes AvailabilityWindowService)
      await tx.availabilityWindow.deleteMany({
        where: { mentorProfileId: profileId },
      });

      const created = [];

      for (const w of incoming) {
        const startTime = timeStringToDateTime(w.startTime);
        const endTime = timeStringToDateTime(w.endTime);

        const window = await tx.availabilityWindow.create({
          data: {
            mentorProfileId: profileId,
            dayOfWeek: w.dayOfWeek || null,
            specificDate: w.specificDate ? new Date(w.specificDate + 'T00:00:00.000Z') : null,
            startTime,
            endTime,
            timezone: w.timezone || 'Asia/Kolkata',
          },
        });

        // Create window-service mappings
        if (w.mentorServiceIds.length > 0) {
          await tx.availabilityWindowService.createMany({
            data: w.mentorServiceIds.map((msId) => ({
              windowId: window.id,
              mentorServiceId: msId,
            })),
          });
        }

        // Re-fetch with includes
        const full = await tx.availabilityWindow.findUnique({
          where: { id: window.id },
          include: {
            windowServices: {
              include: {
                mentorService: {
                  include: { service: true },
                },
              },
            },
          },
        });

        created.push(full);
      }

      return created;
    });

    return result.map(this._mapWindow);
  }

  /**
   * Check if a booking's time range fits within a window definition.
   */
  _bookingFitsWindow(booking, windowDef) {
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);

    // Check day match
    if (windowDef.dayOfWeek) {
      const dayMap = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
      const bookingDay = dayMap[bookingStart.getUTCDay()];
      if (bookingDay !== windowDef.dayOfWeek) return false;
    }

    if (windowDef.specificDate) {
      const bookingDateStr = bookingStart.toISOString().split('T')[0];
      if (bookingDateStr !== windowDef.specificDate) return false;
    }

    // Check time range containment
    const [wStartH, wStartM] = windowDef.startTime.split(':').map(Number);
    const [wEndH, wEndM] = windowDef.endTime.split(':').map(Number);
    const windowStartMin = wStartH * 60 + wStartM;
    const windowEndMin = wEndH * 60 + wEndM;

    const bookingStartMin = bookingStart.getUTCHours() * 60 + bookingStart.getUTCMinutes();
    const bookingEndMin = bookingEnd.getUTCHours() * 60 + bookingEnd.getUTCMinutes();

    return bookingStartMin >= windowStartMin && bookingEndMin <= windowEndMin;
  }

  /**
   * Map a raw AvailabilityWindow to API shape.
   */
  _mapWindow(w) {
    return {
      id: w.id,
      dayOfWeek: w.dayOfWeek,
      specificDate: w.specificDate
        ? new Date(w.specificDate).toISOString().split('T')[0]
        : null,
      startTime: dateTimeToTimeString(w.startTime),
      endTime: dateTimeToTimeString(w.endTime),
      timezone: w.timezone,
      services: (w.windowServices || []).map((ws) => ({
        windowServiceId: ws.id,
        mentorServiceId: ws.mentorServiceId,
        serviceName: ws.mentorService?.service?.name,
        serviceSlug: ws.mentorService?.service?.slug,
        price: ws.mentorService?.price,
        durationMinutes: ws.mentorService?.durationMinutes,
      })),
    };
  }
}

export default new AvailabilityWindowService();
