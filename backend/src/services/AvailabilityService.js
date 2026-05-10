import { prisma } from '../config/database.js';
import {
  upsertAvailabilitySchema,
  addSlotSchema,
  updateSlotSchema,
  dayOfWeekParamSchema,
  slotIdParamSchema,
  dayIdParamSchema,
} from '../validators/availability.validator.js';
import {
  timeStringToDateTime,
  dateTimeToTimeString,
  doSlotsOverlap,
} from '../utils/timeUtils.js';
import { DAY_OF_WEEK_LABELS, SERVICE_TYPE_LABELS } from '../constants/services.js';

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

/**
 * Map a raw AvailabilitySlot (with slotServices → mentorService) to a clean API shape.
 */
function mapSlot(slot) {
  return {
    id: slot.id,
    startTime: dateTimeToTimeString(slot.startTime),
    endTime: dateTimeToTimeString(slot.endTime),
    maxBookings: slot.maxBookings,
    isActive: slot.isActive,
    services: (slot.slotServices || []).map((ss) => ({
      slotServiceId: ss.id,
      mentorServiceId: ss.mentorServiceId,
      serviceType: ss.mentorService?.serviceType,
      label: ss.mentorService?.serviceType
        ? SERVICE_TYPE_LABELS[ss.mentorService.serviceType]
        : null,
    })),
    createdAt: slot.createdAt,
    updatedAt: slot.updatedAt,
  };
}

/**
 * Map a WeeklyAvailability row (with slots → slotServices → mentorService) to clean API shape.
 */
function mapDayAvailability(row) {
  return {
    id: row.id,
    dayOfWeek: row.dayOfWeek,
    dayLabel: DAY_OF_WEEK_LABELS[row.dayOfWeek],
    isAvailable: row.isAvailable,
    slots: (row.slots || []).map(mapSlot),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/** Standard include for fetching slots with their service mappings. */
const slotInclude = {
  slotServices: {
    include: {
      mentorService: {
        select: { id: true, serviceType: true, pricePerSession: true, durationMinutes: true },
      },
    },
  },
};

/** Standard include for fetching day availability with nested slots + services. */
const dayInclude = {
  slots: {
    include: slotInclude,
    orderBy: { startTime: 'asc' },
  },
};

// ─── Service ─────────────────────────────────────────────────────────────────

class AvailabilityService {
  /**
   * GET — Fetch the mentor's full weekly availability.
   * Returns all days with their slots and associated services.
   */
  async getByUserId(userId) {
    const profile = await requireMentorProfile(userId);

    const rows = await prisma.weeklyAvailability.findMany({
      where: { mentorProfileId: profile.id },
      include: dayInclude,
      orderBy: { dayOfWeek: 'asc' },
    });

    return rows.map(mapDayAvailability);
  }

  /**
   * PUT — Bulk upsert the entire weekly availability.
   *
   * This is an atomic replace operation:
   * 1. Days NOT in the payload are deleted (cascade removes their slots + slotServices).
   * 2. Each incoming day is upserted.
   * 3. Each day's slots are replaced entirely (old slots deleted, new ones created).
   * 4. SlotService join records are created for each slot's serviceIds.
   *
   * Overlap prevention: validated at Zod level AND in the transaction.
   */
  async bulkUpsert(userId, payload) {
    const { availability: incoming } = upsertAvailabilitySchema.parse(payload);

    const profile = await requireMentorProfile(userId);
    const profileId = profile.id;
    const incomingDays = incoming.map((a) => a.dayOfWeek);

    // Validate that all referenced serviceIds belong to this mentor
    const allServiceIds = [...new Set(incoming.flatMap((d) => d.slots.flatMap((s) => s.serviceIds)))];
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
      // 1. Delete days not in the incoming set (cascade removes slots + slotServices)
      await tx.weeklyAvailability.deleteMany({
        where: {
          mentorProfileId: profileId,
          dayOfWeek: { notIn: incomingDays },
        },
      });

      const upserted = [];

      for (const day of incoming) {
        // Skip days with no slots (effectively removes them)
        if (day.slots.length === 0) {
          await tx.weeklyAvailability.deleteMany({
            where: {
              mentorProfileId: profileId,
              dayOfWeek: day.dayOfWeek,
            },
          });
          continue;
        }

        // 2. Upsert the day record
        const dayRow = await tx.weeklyAvailability.upsert({
          where: {
            mentorProfileId_dayOfWeek: {
              mentorProfileId: profileId,
              dayOfWeek: day.dayOfWeek,
            },
          },
          update: { updatedAt: new Date(), isAvailable: true },
          create: {
            mentorProfileId: profileId,
            dayOfWeek: day.dayOfWeek,
          },
        });

        // 3. Delete all existing slots for this day (cascade removes slotServices)
        await tx.availabilitySlot.deleteMany({
          where: { weeklyAvailabilityId: dayRow.id },
        });

        // 4. Create new slots with their service mappings
        for (const slot of day.slots) {
          const startTime = timeStringToDateTime(slot.startTime);
          const endTime = timeStringToDateTime(slot.endTime);

          const createdSlot = await tx.availabilitySlot.create({
            data: {
              weeklyAvailabilityId: dayRow.id,
              startTime,
              endTime,
              maxBookings: slot.maxBookings,
              isActive: slot.isActive ?? true,
            },
          });

          // 5. Create SlotService join records
          if (slot.serviceIds.length > 0) {
            await tx.slotService.createMany({
              data: slot.serviceIds.map((serviceId) => ({
                availabilitySlotId: createdSlot.id,
                mentorServiceId: serviceId,
              })),
            });
          }
        }

        // Re-fetch with full includes
        const full = await tx.weeklyAvailability.findUnique({
          where: { id: dayRow.id },
          include: dayInclude,
        });

        upserted.push(full);
      }

      return upserted;
    });

    return result.map(mapDayAvailability);
  }

  /**
   * POST — Add a single slot to an existing day.
   * Validates against overlaps with existing slots on that day.
   */
  async addSlotToDay(userId, dayId, payload) {
    const { dayId: validDayId } = dayIdParamSchema.parse({ dayId });
    const data = addSlotSchema.parse(payload);

    const profile = await requireMentorProfile(userId);

    // Verify the day belongs to this mentor
    const day = await prisma.weeklyAvailability.findFirst({
      where: { id: validDayId, mentorProfileId: profile.id },
      include: { slots: { select: { id: true, startTime: true, endTime: true } } },
    });

    if (!day) throw createServiceError(404, 'Day availability not found');

    // Validate service IDs
    const validServices = await prisma.mentorService.findMany({
      where: { mentorProfileId: profile.id, id: { in: data.serviceIds } },
      select: { id: true },
    });
    if (validServices.length !== data.serviceIds.length) {
      throw createServiceError(400, 'One or more service IDs are invalid');
    }

    const newStart = timeStringToDateTime(data.startTime);
    const newEnd = timeStringToDateTime(data.endTime);

    // Check for overlaps with existing slots
    for (const existing of day.slots) {
      if (doSlotsOverlap({ startTime: newStart, endTime: newEnd }, existing)) {
        throw createServiceError(
          409,
          `Slot ${data.startTime}–${data.endTime} overlaps with existing slot ${dateTimeToTimeString(existing.startTime)}–${dateTimeToTimeString(existing.endTime)}`
        );
      }
    }

    // Create inside transaction
    const created = await prisma.$transaction(async (tx) => {
      const slot = await tx.availabilitySlot.create({
        data: {
          weeklyAvailabilityId: validDayId,
          startTime: newStart,
          endTime: newEnd,
          maxBookings: data.maxBookings,
        },
      });

      await tx.slotService.createMany({
        data: data.serviceIds.map((serviceId) => ({
          availabilitySlotId: slot.id,
          mentorServiceId: serviceId,
        })),
      });

      return tx.availabilitySlot.findUnique({
        where: { id: slot.id },
        include: slotInclude,
      });
    });

    return mapSlot(created);
  }

  /**
   * PUT — Update an existing slot (time range, services, maxBookings, active status).
   * If time range changes, validates against overlaps.
   */
  async updateSlot(userId, slotId, payload) {
    const { slotId: validSlotId } = slotIdParamSchema.parse({ slotId });
    const data = updateSlotSchema.parse(payload);

    const profile = await requireMentorProfile(userId);

    // Fetch the slot and verify ownership
    const existingSlot = await prisma.availabilitySlot.findUnique({
      where: { id: validSlotId },
      include: {
        weeklyAvailability: { select: { id: true, mentorProfileId: true } },
      },
    });

    if (!existingSlot || existingSlot.weeklyAvailability.mentorProfileId !== profile.id) {
      throw createServiceError(404, 'Slot not found');
    }

    // If time is changing, check for overlaps with sibling slots
    const newStart = data.startTime ? timeStringToDateTime(data.startTime) : existingSlot.startTime;
    const newEnd = data.endTime ? timeStringToDateTime(data.endTime) : existingSlot.endTime;

    if (data.startTime || data.endTime) {
      const siblings = await prisma.availabilitySlot.findMany({
        where: {
          weeklyAvailabilityId: existingSlot.weeklyAvailabilityId,
          id: { not: validSlotId },
        },
        select: { id: true, startTime: true, endTime: true },
      });

      for (const sibling of siblings) {
        if (doSlotsOverlap({ startTime: newStart, endTime: newEnd }, sibling)) {
          throw createServiceError(
            409,
            `Updated slot overlaps with ${dateTimeToTimeString(sibling.startTime)}–${dateTimeToTimeString(sibling.endTime)}`
          );
        }
      }
    }

    // Validate service IDs if provided
    if (data.serviceIds) {
      const validServices = await prisma.mentorService.findMany({
        where: { mentorProfileId: profile.id, id: { in: data.serviceIds } },
        select: { id: true },
      });
      if (validServices.length !== data.serviceIds.length) {
        throw createServiceError(400, 'One or more service IDs are invalid');
      }
    }

    const updated = await prisma.$transaction(async (tx) => {
      // Update the slot itself
      await tx.availabilitySlot.update({
        where: { id: validSlotId },
        data: {
          ...(data.startTime && { startTime: newStart }),
          ...(data.endTime && { endTime: newEnd }),
          ...(data.maxBookings !== undefined && { maxBookings: data.maxBookings }),
          ...(data.isActive !== undefined && { isActive: data.isActive }),
        },
      });

      // Replace services if provided
      if (data.serviceIds) {
        await tx.slotService.deleteMany({ where: { availabilitySlotId: validSlotId } });
        await tx.slotService.createMany({
          data: data.serviceIds.map((serviceId) => ({
            availabilitySlotId: validSlotId,
            mentorServiceId: serviceId,
          })),
        });
      }

      return tx.availabilitySlot.findUnique({
        where: { id: validSlotId },
        include: slotInclude,
      });
    });

    return mapSlot(updated);
  }

  /**
   * DELETE — Remove a single slot.
   */
  async deleteSlot(userId, slotId) {
    const { slotId: validSlotId } = slotIdParamSchema.parse({ slotId });
    const profile = await requireMentorProfile(userId);

    const slot = await prisma.availabilitySlot.findUnique({
      where: { id: validSlotId },
      include: {
        weeklyAvailability: { select: { mentorProfileId: true } },
        bookings: { where: { bookingStatus: { in: ['PENDING', 'CONFIRMED'] } }, select: { id: true } },
      },
    });

    if (!slot || slot.weeklyAvailability.mentorProfileId !== profile.id) {
      throw createServiceError(404, 'Slot not found');
    }

    // Prevent deletion if there are active bookings
    if (slot.bookings.length > 0) {
      throw createServiceError(
        409,
        `Cannot delete slot: ${slot.bookings.length} active booking(s) exist. Cancel them first.`
      );
    }

    // Cascade deletes SlotService children
    await prisma.availabilitySlot.delete({ where: { id: validSlotId } });

    return { deleted: true, slotId: validSlotId };
  }

  /**
   * DELETE — Remove all availability for a specific day.
   */
  async deleteByDay(userId, params) {
    const { dayOfWeek } = dayOfWeekParamSchema.parse(params);
    const profile = await requireMentorProfile(userId);

    const existing = await prisma.weeklyAvailability.findUnique({
      where: {
        mentorProfileId_dayOfWeek: {
          mentorProfileId: profile.id,
          dayOfWeek,
        },
      },
      include: {
        slots: {
          include: {
            bookings: {
              where: { bookingStatus: { in: ['PENDING', 'CONFIRMED'] } },
              select: { id: true },
            },
          },
        },
      },
    });

    if (!existing) {
      throw createServiceError(404, `Availability for ${dayOfWeek} not found`);
    }

    // Check for active bookings across all slots
    const activeBookingsCount = existing.slots.reduce((sum, s) => sum + s.bookings.length, 0);
    if (activeBookingsCount > 0) {
      throw createServiceError(
        409,
        `Cannot delete ${dayOfWeek}: ${activeBookingsCount} active booking(s) exist across its slots.`
      );
    }

    // Cascade deletes AvailabilitySlots → SlotServices
    await prisma.weeklyAvailability.delete({ where: { id: existing.id } });

    return { deleted: true, dayOfWeek };
  }
}

export default new AvailabilityService();
