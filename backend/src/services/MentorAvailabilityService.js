import { prisma } from '../config/database.js';
import { upsertAvailabilitySchema, dayOfWeekParamSchema } from '../validators/mentorService.validator.js';
import { DAY_OF_WEEK_LABELS } from '../constants/services.js';

const createServiceError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Maps a raw WeeklyAvailability row (with timeSlots) to a clean API shape.
 */
const mapAvailability = (row) => ({
  id: row.id,
  dayOfWeek: row.dayOfWeek,
  dayLabel: DAY_OF_WEEK_LABELS[row.dayOfWeek],
  timeSlots: (row.timeSlots || []).map((ts) => ({
    id: ts.id,
    startTime: ts.startTime,
    endTime: ts.endTime,
  })),
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});

class MentorAvailabilityService {
  /**
   * Fetch weekly availability for a mentor (by userId).
   */
  async getByUserId(userId) {
    const profile = await prisma.mentorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw createServiceError(404, 'Mentor profile not found');
    }

    const rows = await prisma.weeklyAvailability.findMany({
      where: { mentorProfileId: profile.id },
      include: { timeSlots: true },
      orderBy: { dayOfWeek: 'asc' },
    });

    return rows.map(mapAvailability);
  }

  /**
   * Bulk upsert weekly availability.
   * Replaces the full set: days not in the payload are removed.
   * Each day's time slots are replaced completely.
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
    const incomingDays = incoming.map((a) => a.dayOfWeek);

    const result = await prisma.$transaction(async (tx) => {
      // 1. Delete days that are no longer in the incoming set
      //    (cascades to their TimeSlot children)
      await tx.weeklyAvailability.deleteMany({
        where: {
          mentorProfileId: profileId,
          dayOfWeek: { notIn: incomingDays },
        },
      });

      const upserted = [];

      for (const day of incoming) {
        // Skip days with no time slots (effectively removes them)
        if (day.timeSlots.length === 0) {
          await tx.weeklyAvailability.deleteMany({
            where: {
              mentorProfileId: profileId,
              dayOfWeek: day.dayOfWeek,
            },
          });
          continue;
        }

        // Upsert the day record
        const dayRow = await tx.weeklyAvailability.upsert({
          where: {
            mentorProfileId_dayOfWeek: {
              mentorProfileId: profileId,
              dayOfWeek: day.dayOfWeek,
            },
          },
          update: { updatedAt: new Date() },
          create: {
            mentorProfileId: profileId,
            dayOfWeek: day.dayOfWeek,
          },
        });

        // Replace all time slots for this day
        await tx.timeSlot.deleteMany({
          where: { weeklyAvailabilityId: dayRow.id },
        });

        if (day.timeSlots.length > 0) {
          await tx.timeSlot.createMany({
            data: day.timeSlots.map((slot) => ({
              weeklyAvailabilityId: dayRow.id,
              startTime: slot.startTime,
              endTime: slot.endTime,
            })),
          });
        }

        // Re-fetch with slots
        const full = await tx.weeklyAvailability.findUnique({
          where: { id: dayRow.id },
          include: { timeSlots: true },
        });

        upserted.push(full);
      }

      return upserted;
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

    const existing = await prisma.weeklyAvailability.findUnique({
      where: {
        mentorProfileId_dayOfWeek: {
          mentorProfileId: profile.id,
          dayOfWeek,
        },
      },
    });

    if (!existing) {
      throw createServiceError(404, `Availability for ${dayOfWeek} not found`);
    }

    // Cascade deletes TimeSlot children
    await prisma.weeklyAvailability.delete({
      where: { id: existing.id },
    });

    return { deleted: true, dayOfWeek };
  }
}

export default new MentorAvailabilityService();
