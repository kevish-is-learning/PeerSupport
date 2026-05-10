import { z } from 'zod';
import { VALID_SERVICE_TYPES, VALID_DAYS } from '../constants/services.js';

// ─── Shared Enums ────────────────────────────────────────────────────────────

const serviceTypeEnum = z.enum(VALID_SERVICE_TYPES, {
  errorMap: () => ({ message: `Service type must be one of: ${VALID_SERVICE_TYPES.join(', ')}` }),
});

const dayOfWeekEnum = z.enum(VALID_DAYS, {
  errorMap: () => ({ message: `Day must be one of: ${VALID_DAYS.join(', ')}` }),
});

// ─── Time Validation ─────────────────────────────────────────────────────────

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const timeStringSchema = z.string().regex(timePattern, 'Time must be in HH:mm format (e.g., 09:00, 14:30)');

// ─── Slot Schema (for a single slot within a day) ────────────────────────────

const slotInputSchema = z
  .object({
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    maxBookings: z.number().int().min(1, 'maxBookings must be at least 1').default(1),
    isActive: z.boolean().default(true),
    // Array of MentorService IDs that this slot supports
    serviceIds: z
      .array(z.string().uuid('Each serviceId must be a valid UUID'))
      .min(1, 'Each slot must support at least one service'),
  })
  .refine(
    (slot) => {
      const [startH, startM] = slot.startTime.split(':').map(Number);
      const [endH, endM] = slot.endTime.split(':').map(Number);
      const startMins = startH * 60 + startM;
      const endMins = endH * 60 + endM;
      return endMins - startMins >= 15;
    },
    {
      message: 'Slot must be at least 15 minutes long and end time must be after start time',
    }
  );

// ─── Day Availability Schema ─────────────────────────────────────────────────

const dayAvailabilitySchema = z
  .object({
    dayOfWeek: dayOfWeekEnum,
    slots: z.array(slotInputSchema).default([]),
  })
  .refine(
    (day) => {
      if (day.slots.length <= 1) return true;

      // Parse all slots and check for overlaps
      const parsed = day.slots
        .map((s) => {
          const [startH, startM] = s.startTime.split(':').map(Number);
          const [endH, endM] = s.endTime.split(':').map(Number);
          return { start: startH * 60 + startM, end: endH * 60 + endM };
        })
        .sort((a, b) => a.start - b.start);

      for (let i = 0; i < parsed.length - 1; i++) {
        if (parsed[i].end > parsed[i + 1].start) {
          return false;
        }
      }
      return true;
    },
    { message: 'Time slots cannot overlap on the same day' }
  );

// ─── Bulk Upsert Availability ────────────────────────────────────────────────

/**
 * Full weekly availability payload.
 * Replaces the entire week: days not included are removed.
 */
export const upsertAvailabilitySchema = z.object({
  availability: z
    .array(dayAvailabilitySchema)
    .refine(
      (items) => {
        const days = items.map((i) => i.dayOfWeek);
        return new Set(days).size === days.length;
      },
      { message: 'Duplicate days are not allowed' }
    ),
});

// ─── Single Slot Add/Update ──────────────────────────────────────────────────

export const addSlotSchema = z.object({
  startTime: timeStringSchema,
  endTime: timeStringSchema,
  maxBookings: z.number().int().min(1).default(1),
  serviceIds: z
    .array(z.string().uuid())
    .min(1, 'At least one service is required'),
}).refine(
  (slot) => {
    const [startH, startM] = slot.startTime.split(':').map(Number);
    const [endH, endM] = slot.endTime.split(':').map(Number);
    return (endH * 60 + endM) - (startH * 60 + startM) >= 15;
  },
  { message: 'Slot must be at least 15 minutes long' }
);

export const updateSlotSchema = z.object({
  startTime: timeStringSchema.optional(),
  endTime: timeStringSchema.optional(),
  maxBookings: z.number().int().min(1).optional(),
  isActive: z.boolean().optional(),
  serviceIds: z
    .array(z.string().uuid())
    .min(1, 'At least one service is required')
    .optional(),
}).refine(
  (slot) => {
    if (slot.startTime && slot.endTime) {
      const [startH, startM] = slot.startTime.split(':').map(Number);
      const [endH, endM] = slot.endTime.split(':').map(Number);
      return (endH * 60 + endM) - (startH * 60 + startM) >= 15;
    }
    return true;
  },
  { message: 'Slot must be at least 15 minutes long' }
);

// ─── Params ──────────────────────────────────────────────────────────────────

export const dayOfWeekParamSchema = z.object({
  dayOfWeek: dayOfWeekEnum,
});

export const slotIdParamSchema = z.object({
  slotId: z.string().uuid('Invalid slot ID'),
});

export const dayIdParamSchema = z.object({
  dayId: z.string().uuid('Invalid day ID'),
});

export default {
  upsertAvailabilitySchema,
  addSlotSchema,
  updateSlotSchema,
  dayOfWeekParamSchema,
  slotIdParamSchema,
  dayIdParamSchema,
};
