import { prisma } from '../config/database.js';
import {
  upsertAvailabilitySchema,
  dateParamSchema,
} from '../validators/availability.validator.js';
import { utcToIstDateString } from '../utils/timezoneUtils.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Resolve the mentor profile ID from a user ID.
 * Throws 404 if not found.
 */
async function requireMentorProfile(userId) {
  const profile = await prisma.mentorProfile.findUnique({
    where: { userId },
    select: { id: true },
  });
  if (!profile) throw createServiceError(404, 'Mentor profile not found');
  return profile;
}

/** Standard include for fetching windows with their service mappings. */
const windowInclude = {
  windowServices: {
    include: {
      mentorService: {
        include: { service: true },
      },
    },
  },
};

/**
 * Map an AvailabilityWindow row to a clean API shape.
 */
function mapWindow(w) {
  return {
    id: w.id,
    specificDate: w.specificDate
      ? new Date(w.specificDate).toISOString().split('T')[0]
      : null,
    startTime: w.startTime,
    endTime: w.endTime,
    timezone: w.timezone,
    services: (w.windowServices || []).map((ws) => ({
      windowServiceId: ws.id,
      mentorServiceId: ws.mentorServiceId,
      serviceName: ws.mentorService?.service?.name,
      serviceSlug: ws.mentorService?.service?.slug,
    })),
    createdAt: w.createdAt,
    updatedAt: w.updatedAt,
  };
}

// ─── Service ─────────────────────────────────────────────────────────────────

class AvailabilityService {
  /**
   * GET — Fetch the mentor's full availability windows.
   */
  async getByUserId(userId) {
    const profile = await requireMentorProfile(userId);

    const rows = await prisma.availabilityWindow.findMany({
      where: { mentorProfileId: profile.id },
      include: windowInclude,
      orderBy: { startTime: 'asc' },
    });

    return rows.map(mapWindow);
  }

  /**
   * PUT — Bulk upsert availability windows.
   *
   * This is an atomic replace operation:
   * 1. All existing windows are deleted.
   * 2. New windows with service mappings are created.
   *
   * Checks for orphaned bookings before deleting.
   */
  async bulkUpsert(userId, payload) {
    const { availability: incoming } = upsertAvailabilitySchema.parse(payload);

    const profile = await requireMentorProfile(userId);
    const profileId = profile.id;

    // Validate that all referenced serviceIds belong to this mentor
    const allServiceIds = [...new Set(incoming.flatMap((d) => d.slots?.flatMap((s) => s.serviceIds || []) || []))];
    if (allServiceIds.length > 0) {
      const validServices = await prisma.mentorService.findMany({
        where: { mentorProfileId: profileId, id: { in: allServiceIds } },
        select: { id: true },
      });
      const validIds = new Set(validServices.map((s) => s.id));
      const invalid = allServiceIds.filter((id) => !validIds.has(id));
      if (invalid.length > 0) {
        throw createServiceError(400, `Invalid service IDs: ${invalid.join(', ')}. Services must belong to your profile.`);
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Delete all existing windows (cascade deletes AvailabilityWindowService)
      await tx.availabilityWindow.deleteMany({
        where: { mentorProfileId: profileId },
      });

      const created = [];

      for (const day of incoming) {
        const slots = day.slots || [];
        if (slots.length === 0) continue;

        for (const slot of slots) {
          const startTime = new Date(`1970-01-01T${slot.startTime}:00.000Z`);
          const endTime = new Date(`1970-01-01T${slot.endTime}:00.000Z`);

          const window = await tx.availabilityWindow.create({
            data: {
              mentorProfileId: profileId,
              specificDate: day.specificDate
                ? new Date(`${day.specificDate}T00:00:00.000Z`)
                : null,
              startTime,
              endTime,
            },
          });

          // Create window-service join records
          if (slot.serviceIds && slot.serviceIds.length > 0) {
            await tx.availabilityWindowService.createMany({
              data: slot.serviceIds.map((serviceId) => ({
                windowId: window.id,
                mentorServiceId: serviceId,
              })),
            });
          }

          // Re-fetch with includes
          const full = await tx.availabilityWindow.findUnique({
            where: { id: window.id },
            include: windowInclude,
          });

          created.push(full);
        }
      }

      return created;
    });

    return result.map(mapWindow);
  }

  /**
   * DELETE — Remove all availability for a specific date.
   */
  async deleteByDate(userId, params) {
    const { date } = dateParamSchema.parse(params);
    const profile = await requireMentorProfile(userId);

    const existing = await prisma.availabilityWindow.findMany({
      where: {
        mentorProfileId: profile.id,
        specificDate: new Date(`${date}T00:00:00.000Z`),
      },
    });

    if (existing.length === 0) {
      throw createServiceError(404, `Availability for ${date} not found`);
    }

    const activeBookings = await prisma.booking.findMany({
      where: {
        mentorProfileId: profile.id,
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
      select: { id: true, startTime: true },
    });

    const conflicting = activeBookings.filter((b) => utcToIstDateString(b.startTime) === date);

    if (conflicting.length > 0) {
      throw createServiceError(
        409,
        `Cannot delete ${date}: ${conflicting.length} active booking(s) exist. Cancel them first.`
      );
    }

    await prisma.availabilityWindow.deleteMany({
      where: {
        mentorProfileId: profile.id,
        specificDate: new Date(`${date}T00:00:00.000Z`),
      },
    });

    return { deleted: true, specificDate: date };
  }
}

export default new AvailabilityService();
