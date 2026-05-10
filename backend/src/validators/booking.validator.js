import { z } from 'zod';
import { VALID_SERVICE_TYPES } from '../constants/services.js';

const serviceTypeEnum = z.enum(VALID_SERVICE_TYPES, {
  errorMap: () => ({ message: `Service type must be one of: ${VALID_SERVICE_TYPES.join(', ')}` }),
});

// ─── Create Booking ──────────────────────────────────────────────────────────

/**
 * Schema for creating a new booking.
 * The mentee selects:
 *   - which mentor (mentorProfileId)
 *   - which service (mentorServiceId)
 *   - which slot (availabilitySlotId)
 *   - which date (scheduledDate)
 */
export const createBookingSchema = z.object({
  mentorProfileId: z.string().uuid('Invalid mentor profile ID'),
  mentorServiceId: z.string().uuid('Invalid service ID'),
  availabilitySlotId: z.string().uuid('Invalid slot ID'),
  scheduledDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine(
      (dateStr) => {
        const d = new Date(dateStr + 'T00:00:00.000Z');
        return !isNaN(d.getTime());
      },
      { message: 'Invalid date' }
    ),
  sessionType: z.enum(['ONE_ON_ONE', 'GROUP_DISCUSSION']).default('ONE_ON_ONE'),
  purposeOfCall: z.string().max(1000).optional(),
  notes: z.string().max(2000).optional(),
  sharedResume: z.boolean().default(false),
});

// ─── Cancel Booking ──────────────────────────────────────────────────────────

export const cancelBookingSchema = z.object({
  cancelledReason: z.string().min(5, 'Please provide a reason (at least 5 characters)').max(500),
});

// ─── Query Available Slots ───────────────────────────────────────────────────

/**
 * Query parameters for fetching available slots.
 * Mentee selects a service and a date → we find matching slots.
 */
export const availableSlotsQuerySchema = z.object({
  serviceType: serviceTypeEnum,
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine(
      (dateStr) => {
        const d = new Date(dateStr + 'T00:00:00.000Z');
        return !isNaN(d.getTime());
      },
      { message: 'Invalid date' }
    ),
});

// ─── Params ──────────────────────────────────────────────────────────────────

export const bookingIdParamSchema = z.object({
  bookingId: z.string().uuid('Invalid booking ID'),
});

export const mentorIdParamSchema = z.object({
  mentorId: z.string().uuid('Invalid mentor ID'),
});

export default {
  createBookingSchema,
  cancelBookingSchema,
  availableSlotsQuerySchema,
  bookingIdParamSchema,
  mentorIdParamSchema,
};
