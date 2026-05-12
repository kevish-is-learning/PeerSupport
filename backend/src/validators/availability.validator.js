import { z } from 'zod';

// ─── Time Validation ─────────────────────────────────────────────────────────

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const timeStringSchema = z.string().regex(timePattern, 'Time must be in HH:mm format (e.g., 09:00, 14:30)');

// ─── Slot Schema (for a single window within a day) ──────────────────────────

const slotInputSchema = z
  .object({
    startTime: timeStringSchema,
    endTime: timeStringSchema,
    // Array of MentorService IDs offered during this window
    serviceIds: z
      .array(z.string().uuid('Each serviceId must be a valid UUID'))
      .min(1, 'Each window must support at least one service'),
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
      message: 'Window must be at least 15 minutes long and end time must be after start time',
    }
  );

// ─── Day Availability Schema ─────────────────────────────────────────────────

const dayAvailabilitySchema = z
  .object({
    specificDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
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
    { message: 'Time windows cannot overlap on the same day' }
  );

// ─── Bulk Upsert Availability ────────────────────────────────────────────────

/**
 * Full availability payload.
 * Replaces the entire set: dates not included are removed.
 */
export const upsertAvailabilitySchema = z.object({
  availability: z
    .array(dayAvailabilitySchema)
    .refine(
      (items) => {
        const dates = items.map((i) => i.specificDate);
        return new Set(dates).size === dates.length;
      },
      { message: 'Duplicate dates are not allowed' }
    ),
});

// ─── Params ──────────────────────────────────────────────────────────────────

export const dateParamSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export default {
  upsertAvailabilitySchema,
  dateParamSchema,
};
