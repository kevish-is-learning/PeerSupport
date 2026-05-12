/**
 * AvailabilityWindow Service (v2)
 *
 * PUT /mentor/availability — save AvailabilityWindow + AvailabilityWindowService rows.
 * Before saving, checks if any CONFIRMED/PENDING bookings conflict with windows
 * being deleted or changed — returns 409 with conflicting bookings listed.
 */

import { prisma } from '../../config/database.js';
import {
  availabilityWindowIdParamSchema,
  availabilityDateParamSchema,
  createAvailabilityWindowSchema,
  updateAvailabilityWindowSchema,
  replaceDateWindowsSchema,
  upsertAvailabilitySchema,
} from '../../validators/v2.validator.js';
import { timeStringToDateTime, dateTimeToTimeString, timeToMinutes } from '../../utils/timeUtils.js';
import { utcToIstDateString, utcToIstTimeString } from '../../utils/timezoneUtils.js';

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
      orderBy: [{ specificDate: 'asc' }, { startTime: 'asc' }],
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
      orderBy: [{ specificDate: 'asc' }, { startTime: 'asc' }],
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

    // Reject past dates and overlapping windows in the incoming payload
    for (const w of incoming) {
      if (w.specificDate) {
        this._assertNotPastDate(w.specificDate);
      }
    }
    this._assertNoOverlapsInSet(incoming);

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
    const createdIds = await prisma.$transaction(async (tx) => {
      // Delete all existing windows (cascade deletes AvailabilityWindowService)
      await tx.availabilityWindow.deleteMany({
        where: { mentorProfileId: profileId },
      });

      const ids = [];

      for (const w of incoming) {
        const startTime = timeStringToDateTime(w.startTime);
        const endTime = timeStringToDateTime(w.endTime);

        const window = await tx.availabilityWindow.create({
          data: {
            mentorProfileId: profileId,
            dayOfWeek: null,
            specificDate: new Date(`${w.specificDate}T00:00:00.000Z`),
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

        ids.push(window.id);
      }

      return ids;
    }, { timeout: 15000 });

    // Re-fetch full objects outside the transaction to avoid timeout
    const result = await prisma.availabilityWindow.findMany({
      where: { id: { in: createdIds } },
      include: {
        windowServices: {
          include: {
            mentorService: {
              include: { service: true },
            },
          },
        },
      },
      orderBy: [{ specificDate: 'asc' }, { startTime: 'asc' }],
    });

    return result.map(this._mapWindow);
  }

  /**
   * POST /mentor/availability/windows — Create a single date-specific window.
   */
  async createWindow(userId, payload) {
    const data = createAvailabilityWindowSchema.parse(payload);
    const profile = await requireMentorProfile(userId);

    this._assertNotPastDate(data.specificDate);
    await this._assertValidMentorServices(profile.id, data.mentorServiceIds);
    await this._assertNoOverlaps(profile.id, data.specificDate, data.startTime, data.endTime);

    const window = await prisma.availabilityWindow.create({
      data: {
        mentorProfileId: profile.id,
        dayOfWeek: null,
        specificDate: new Date(`${data.specificDate}T00:00:00.000Z`),
        startTime: timeStringToDateTime(data.startTime),
        endTime: timeStringToDateTime(data.endTime),
        timezone: data.timezone || 'Asia/Kolkata',
      },
    });

    if (data.mentorServiceIds.length > 0) {
      await prisma.availabilityWindowService.createMany({
        data: data.mentorServiceIds.map((msId) => ({
          windowId: window.id,
          mentorServiceId: msId,
        })),
      });
    }

    const full = await prisma.availabilityWindow.findUnique({
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

    return this._mapWindow(full);
  }

  /**
   * PATCH /mentor/availability/windows/:id — Update a date-specific window.
   */
  async updateWindow(userId, windowId, payload) {
    const { id: validId } = availabilityWindowIdParamSchema.parse({ id: windowId });
    const data = updateAvailabilityWindowSchema.parse(payload);
    const profile = await requireMentorProfile(userId);

    const existing = await prisma.availabilityWindow.findUnique({
      where: { id: validId },
      include: {
        windowServices: true,
      },
    });

    if (!existing || existing.mentorProfileId !== profile.id) {
      throw createServiceError(404, 'Availability window not found');
    }

    const specificDate = data.specificDate || (existing.specificDate
      ? new Date(existing.specificDate).toISOString().split('T')[0]
      : null);

    if (!specificDate) {
      throw createServiceError(400, 'specificDate is required');
    }

    this._assertNotPastDate(specificDate);
    await this._assertValidMentorServices(profile.id, data.mentorServiceIds);
    await this._assertNoOverlaps(profile.id, specificDate, data.startTime, data.endTime, validId);

    const existingWindows = await prisma.availabilityWindow.findMany({
      where: { mentorProfileId: profile.id },
    });

    const updatedDef = {
      id: validId,
      dayOfWeek: null,
      specificDate,
      startTime: data.startTime,
      endTime: data.endTime,
    };

    const remainingDefs = existingWindows
      .filter((w) => w.id !== validId)
      .map((w) => this._mapWindowDef(w));

    await this._assertNoOrphanedBookings(profile.id, [...remainingDefs, updatedDef]);

    const updated = await prisma.$transaction(async (tx) => {
      const window = await tx.availabilityWindow.update({
        where: { id: validId },
        data: {
          dayOfWeek: null,
          specificDate: new Date(`${specificDate}T00:00:00.000Z`),
          startTime: timeStringToDateTime(data.startTime),
          endTime: timeStringToDateTime(data.endTime),
          timezone: data.timezone || existing.timezone || 'Asia/Kolkata',
        },
      });

      await tx.availabilityWindowService.deleteMany({
        where: { windowId: validId },
      });

      if (data.mentorServiceIds.length > 0) {
        await tx.availabilityWindowService.createMany({
          data: data.mentorServiceIds.map((msId) => ({
            windowId: validId,
            mentorServiceId: msId,
          })),
        });
      }

      return window;
    });

    const full = await prisma.availabilityWindow.findUnique({
      where: { id: updated.id },
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

    return this._mapWindow(full);
  }

  /**
   * DELETE /mentor/availability/windows/:id — Delete a window.
   */
  async deleteWindow(userId, windowId) {
    const { id: validId } = availabilityWindowIdParamSchema.parse({ id: windowId });
    const profile = await requireMentorProfile(userId);

    const existing = await prisma.availabilityWindow.findUnique({
      where: { id: validId },
    });

    if (!existing || existing.mentorProfileId !== profile.id) {
      throw createServiceError(404, 'Availability window not found');
    }

    const remaining = await prisma.availabilityWindow.findMany({
      where: { mentorProfileId: profile.id, id: { not: validId } },
    });

    const remainingDefs = remaining.map((w) => this._mapWindowDef(w));
    await this._assertNoOrphanedBookings(profile.id, remainingDefs);

    await prisma.availabilityWindow.delete({
      where: { id: validId },
    });

    return { id: validId };
  }

  /**
   * PUT /mentor/availability/dates/:date — Replace windows for a specific date.
   */
  async replaceDateWindows(userId, dateParam, payload) {
    const { date: dateStr } = availabilityDateParamSchema.parse({ date: dateParam });
    const { windows: incoming } = replaceDateWindowsSchema.parse(payload);
    const profile = await requireMentorProfile(userId);

    this._assertNotPastDate(dateStr);

    const allMsIds = [...new Set(incoming.flatMap((w) => w.mentorServiceIds))];
    await this._assertValidMentorServices(profile.id, allMsIds);

    const windowsForDate = incoming.map((w) => ({
      specificDate: dateStr,
      startTime: w.startTime,
      endTime: w.endTime,
    }));
    this._assertNoOverlapsInSet(windowsForDate);

    const existingWindows = await prisma.availabilityWindow.findMany({
      where: { mentorProfileId: profile.id },
    });

    const remainingDefs = existingWindows
      .filter((w) => {
        const specificDate = w.specificDate
          ? new Date(w.specificDate).toISOString().split('T')[0]
          : null;
        return specificDate !== dateStr;
      })
      .map((w) => this._mapWindowDef(w));

    const newDefs = incoming.map((w) => ({
      dayOfWeek: null,
      specificDate: dateStr,
      startTime: w.startTime,
      endTime: w.endTime,
    }));

    await this._assertNoOrphanedBookings(profile.id, [...remainingDefs, ...newDefs]);

    const createdIds = await prisma.$transaction(async (tx) => {
      await tx.availabilityWindow.deleteMany({
        where: {
          mentorProfileId: profile.id,
          specificDate: new Date(`${dateStr}T00:00:00.000Z`),
        },
      });

      const ids = [];
      for (const w of incoming) {
        const window = await tx.availabilityWindow.create({
          data: {
            mentorProfileId: profile.id,
            dayOfWeek: null,
            specificDate: new Date(`${dateStr}T00:00:00.000Z`),
            startTime: timeStringToDateTime(w.startTime),
            endTime: timeStringToDateTime(w.endTime),
            timezone: w.timezone || 'Asia/Kolkata',
          },
        });

        if (w.mentorServiceIds.length > 0) {
          await tx.availabilityWindowService.createMany({
            data: w.mentorServiceIds.map((msId) => ({
              windowId: window.id,
              mentorServiceId: msId,
            })),
          });
        }

        ids.push(window.id);
      }

      return ids;
    }, { timeout: 15000 });

    // Re-fetch full objects outside the transaction to avoid timeout
    const created = await prisma.availabilityWindow.findMany({
      where: { id: { in: createdIds } },
      include: {
        windowServices: {
          include: {
            mentorService: {
              include: { service: true },
            },
          },
        },
      },
      orderBy: { startTime: 'asc' },
    });

    return created.map(this._mapWindow);
  }

  /**
   * Check if a booking's time range fits within a window definition.
   */
  _bookingFitsWindow(booking, windowDef) {
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);

    const bookingDateStr = utcToIstDateString(bookingStart);
    if (bookingDateStr !== windowDef.specificDate) return false;

    // Check time range containment
    const [wStartH, wStartM] = windowDef.startTime.split(':').map(Number);
    const [wEndH, wEndM] = windowDef.endTime.split(':').map(Number);
    const windowStartMin = wStartH * 60 + wStartM;
    const windowEndMin = wEndH * 60 + wEndM;

    const bookingStartMin = timeToMinutes(utcToIstTimeString(bookingStart));
    const bookingEndMin = timeToMinutes(utcToIstTimeString(bookingEnd));

    return bookingStartMin >= windowStartMin && bookingEndMin <= windowEndMin;
  }

  _mapWindowDef(w) {
    return {
      dayOfWeek: null,
      specificDate: w.specificDate
        ? new Date(w.specificDate).toISOString().split('T')[0]
        : null,
      startTime: dateTimeToTimeString(w.startTime),
      endTime: dateTimeToTimeString(w.endTime),
    };
  }

  _assertNotPastDate(dateStr) {
    const todayIst = utcToIstDateString(new Date());
    if (dateStr < todayIst) {
      throw createServiceError(400, 'Cannot set availability in the past');
    }
  }

  async _assertValidMentorServices(profileId, mentorServiceIds) {
    const allMsIds = [...new Set(mentorServiceIds)];
    if (allMsIds.length === 0) return;

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

  async _assertNoOverlaps(profileId, specificDate, startTimeStr, endTimeStr, excludeId = null) {
    const existing = await prisma.availabilityWindow.findMany({
      where: {
        mentorProfileId: profileId,
        specificDate: new Date(`${specificDate}T00:00:00.000Z`),
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
    });

    const newStart = timeToMinutes(startTimeStr);
    const newEnd = timeToMinutes(endTimeStr);

    for (const w of existing) {
      const startMin = timeToMinutes(dateTimeToTimeString(w.startTime));
      const endMin = timeToMinutes(dateTimeToTimeString(w.endTime));
      if (newStart < endMin && newEnd > startMin) {
        throw createServiceError(409, 'Availability window overlaps an existing window for this date');
      }
    }
  }

  _assertNoOverlapsInSet(windows) {
    const groups = new Map();

    for (const w of windows) {
      const key = `date:${w.specificDate}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(w);
    }

    for (const [, group] of groups) {
      const ranges = group
        .map((w) => ({
          start: timeToMinutes(w.startTime),
          end: timeToMinutes(w.endTime),
        }))
        .sort((a, b) => a.start - b.start);

      for (let i = 1; i < ranges.length; i += 1) {
        const prev = ranges[i - 1];
        const curr = ranges[i];
        if (curr.start < prev.end) {
          throw createServiceError(409, 'Availability windows overlap for the same date');
        }
      }
    }
  }

  async _assertNoOrphanedBookings(profileId, windowDefs) {
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

    if (activeBookings.length === 0) return;

    const orphanedBookings = activeBookings.filter((booking) => {
      return !windowDefs.some((w) => this._bookingFitsWindow(booking, w));
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
        serviceName: ws.mentorService?.title || ws.mentorService?.service?.name,
        serviceSlug: ws.mentorService?.service?.slug,
        price: ws.mentorService?.price,
        durationMinutes: ws.mentorService?.durationMinutes,
      })),
    };
  }
}

export default new AvailabilityWindowService();
