import { z } from 'zod';
import { VALID_SERVICE_TYPES } from '../constants/services.js';

// ─── Service Validators ─────────────────────────────────────────────────────

const serviceTypeEnum = z.string().min(1, 'Service type is required');

const singleServiceSchema = z.object({
  serviceType: serviceTypeEnum,
  pricePerSession: z
    .number()
    .nonnegative('Price cannot be negative')
    .optional()
    .nullable(),
  durationMinutes: z.number().int().positive().optional().default(30),
  isActive: z.boolean().optional().default(true),
});

/** Bulk upsert: array of services with pricing */
export const upsertServicesSchema = z.object({
  services: z
    .array(singleServiceSchema)
    .min(1, 'At least one service is required')
    .refine(
      (items) => {
        const types = items.map((i) => i.serviceType);
        return new Set(types).size === types.length;
      },
      { message: 'Duplicate service types are not allowed' },
    ),
});

/** Params: single service type for delete */
export const serviceTypeParamSchema = z.object({
  serviceType: serviceTypeEnum,
});

// ─── Availability Validators ─────────────────────────────────────────────────

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const timeSlotSchema = z
  .object({
    startTime: z.string().regex(timePattern, 'Start time must be HH:mm format'),
    endTime: z.string().regex(timePattern, 'End time must be HH:mm format'),
  })
  .refine((slot) => {
    const [startH, startM] = slot.startTime.split(':').map(Number);
    const [endH, endM] = slot.endTime.split(':').map(Number);
    const startMins = startH * 60 + startM;
    const endMins = endH * 60 + endM;
    return endMins - startMins >= 15;
  }, {
    message: 'Start time must be before end time and duration must be at least 15 minutes',
  });

const dayAvailabilitySchema = z.object({
  specificDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  timeSlots: z.array(timeSlotSchema).default([]),
}).refine((day) => {
  if (day.timeSlots.length <= 1) return true;
  
  const parsedSlots = day.timeSlots.map(s => {
    const [startH, startM] = s.startTime.split(':').map(Number);
    const [endH, endM] = s.endTime.split(':').map(Number);
    return { start: startH * 60 + startM, end: endH * 60 + endM };
  });
  
  parsedSlots.sort((a, b) => a.start - b.start);
  
  for (let i = 0; i < parsedSlots.length - 1; i++) {
    if (parsedSlots[i].end > parsedSlots[i+1].start) {
      return false;
    }
  }
  return true;
}, { message: 'Time slots cannot overlap or conflict on the same day' });

/** Bulk upsert: array of date-level availability */
export const upsertAvailabilitySchema = z.object({
  availability: z.array(dayAvailabilitySchema).refine(
    (items) => {
      const dates = items.map((i) => i.specificDate);
      return new Set(dates).size === dates.length;
    },
    { message: 'Duplicate dates are not allowed' },
  ),
});

/** Params: single date for delete */
export const dateParamSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export default {
  upsertServicesSchema,
  serviceTypeParamSchema,
  upsertAvailabilitySchema,
  dateParamSchema,
};
