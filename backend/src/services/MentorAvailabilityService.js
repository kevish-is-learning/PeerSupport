import { prisma } from '../config/database.js';
import { upsertAvailabilitySchema, dayOfWeekParamSchema } from '../validators/mentorService.validator.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Maps a raw AvailabilityWindow row to a clean API shape.
 */
const mapAvailability = (row) => ({
  id: row.id,
  dayOfWeek: row.dayOfWeek,
  startTime: row.startTime,
  endTime: row.endTime,
  services: (row.windowServices || []).map((ws) => ({
    mentorServiceId: ws.mentorServiceId,
    serviceName: ws.mentorService?.service?.name,
  })),
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

class MentorAvailabilityService {
  /**
   * Fetch availability windows for a mentor (by userId).
   */
  async getByUserId(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const rows = await prisma.availabilityWindow.findMany({
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
      orderBy: { startTime: 'asc' },
    });

    return rows.map(mapAvailability);
  }

  /**
   * Bulk upsert availability windows.
   * Replaces the full set: days not in the payload are removed.
   */
  async bulkUpsert(userId, payload) {
    const { availability: incoming } = upsertAvailabilitySchema.parse(payload);

    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const profileId = profile.id;

    const result = await prisma.$transaction(async (tx) => {
      // Delete all existing windows for this mentor
      await tx.availabilityWindow.deleteMany({
        where: { mentorProfileId: profileId },
      });

      const created = [];

      for (const day of incoming) {
        if (!day.timeSlots || day.timeSlots.length === 0) continue;

        for (const slot of day.timeSlots) {
          const window = await tx.availabilityWindow.create({
            data: {
              mentorProfileId: profileId,
              dayOfWeek: day.dayOfWeek,
              startTime: new Date(`1970-01-01T${slot.startTime}:00.000Z`),
              endTime: new Date(`1970-01-01T${slot.endTime}:00.000Z`),
            },
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

          created.push(window);
        }
      }

      return created;
    });

    return result.map(mapAvailability);
  }

  /**
   * Delete all availability for a specific day.
   */
  async deleteByDay(userId, params) {
    const { dayOfWeek } = dayOfWeekParamSchema.parse(params);

    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const existing = await prisma.availabilityWindow.findMany({
      where: {
        mentorProfileId: profile.id,
        dayOfWeek,
      },
    });

    if (existing.length === 0) {
      throw createServiceError(404, `Availability for ${dayOfWeek} not found`);
    }

    await prisma.availabilityWindow.deleteMany({
      where: {
        mentorProfileId: profile.id,
        dayOfWeek,
      },
    });

    return { deleted: true, dayOfWeek };
  }
}

export default new MentorAvailabilityService();
