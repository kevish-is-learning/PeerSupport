import { z } from 'zod';
import { VALID_SERVICE_TYPES, VALID_DAYS } from '../constants/services.js';

// ─── Service Validators ─────────────────────────────────────────────────────

const serviceTypeEnum = z.enum(VALID_SERVICE_TYPES, {
  errorMap: () => ({ message: `Service type must be one of: ${VALID_SERVICE_TYPES.join(', ')}` }),
});

const singleServiceSchema = z.object({
  serviceType: serviceTypeEnum,
  pricePerSession: z
    .number()
    .nonnegative('Price cannot be negative')
    .optional()
    .nullable(),
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

const dayOfWeekEnum = z.enum(VALID_DAYS, {
  errorMap: () => ({ message: `Day must be one of: ${VALID_DAYS.join(', ')}` }),
});

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

const timeSlotSchema = z
  .object({
    startTime: z.string().regex(timePattern, 'Start time must be HH:mm format'),
    endTime: z.string().regex(timePattern, 'End time must be HH:mm format'),
  })
  .refine((slot) => slot.startTime < slot.endTime, {
    message: 'Start time must be before end time',
  });

const dayAvailabilitySchema = z.object({
  dayOfWeek: dayOfWeekEnum,
  timeSlots: z.array(timeSlotSchema).default([]),
});

/** Bulk upsert: array of day-level availability */
export const upsertAvailabilitySchema = z.object({
  availability: z.array(dayAvailabilitySchema).refine(
    (items) => {
      const days = items.map((i) => i.dayOfWeek);
      return new Set(days).size === days.length;
    },
    { message: 'Duplicate days are not allowed' },
  ),
});

/** Params: single day for delete */
export const dayOfWeekParamSchema = z.object({
  dayOfWeek: dayOfWeekEnum,
});

export default {
  upsertServicesSchema,
  serviceTypeParamSchema,
  upsertAvailabilitySchema,
  dayOfWeekParamSchema,
};
