import { z } from 'zod';

// ─── Shared ──────────────────────────────────────────────────────────────────

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const VALID_DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const VALID_DURATIONS = [15, 30, 45, 60];

// ─── PUT /mentor/services ────────────────────────────────────────────────────

const serviceConfigSchema = z.object({
  serviceId: z.string().uuid('Invalid service ID'),
  price: z.number().positive('Price must be positive'),
  durationMinutes: z.number().refine((v) => VALID_DURATIONS.includes(v), {
    message: `Duration must be one of: ${VALID_DURATIONS.join(', ')}`,
  }),
  bufferMinutes: z.number().int().min(0).max(30).optional().default(0),
  isActive: z.boolean().optional().default(true),
});

export const upsertMentorServicesSchema = z.object({
  services: z
    .array(serviceConfigSchema)
    .min(1, 'At least one service is required')
    .refine(
      (items) => {
        const ids = items.map((i) => i.serviceId);
        return new Set(ids).size === ids.length;
      },
      { message: 'Duplicate service IDs are not allowed' }
    ),
});

// ─── PUT /mentor/availability ────────────────────────────────────────────────

const windowSchema = z
  .object({
    dayOfWeek: z.enum(VALID_DAYS).optional().nullable(),
    specificDate: z
      .string()
      .regex(datePattern, 'Date must be YYYY-MM-DD')
      .optional()
      .nullable(),
    startTime: z.string().regex(timePattern, 'Start time must be HH:mm'),
    endTime: z.string().regex(timePattern, 'End time must be HH:mm'),
    timezone: z.string().optional().default('Asia/Kolkata'),
    mentorServiceIds: z
      .array(z.string().uuid())
      .min(1, 'Each window must offer at least one service'),
  })
  .refine(
    (w) => {
      // At least one of dayOfWeek or specificDate must be set
      return w.dayOfWeek != null || w.specificDate != null;
    },
    { message: 'Each window must have either dayOfWeek or specificDate' }
  )
  .refine(
    (w) => {
      const [startH, startM] = w.startTime.split(':').map(Number);
      const [endH, endM] = w.endTime.split(':').map(Number);
      return endH * 60 + endM > startH * 60 + startM;
    },
    { message: 'End time must be after start time' }
  );

export const upsertAvailabilitySchema = z.object({
  windows: z.array(windowSchema).min(1, 'At least one availability window is required'),
});

// ─── POST /bookings ──────────────────────────────────────────────────────────

export const createBookingSchema = z.object({
  mentorProfileId: z.string().uuid('Invalid mentor profile ID'),
  mentorServiceId: z.string().uuid('Invalid mentor service ID'),
  startTime: z.string().min(1, 'Start time is required'), // IST datetime string
  endTime: z.string().min(1, 'End time is required'),       // IST datetime string
  purposeOfCall: z.string().max(1000).optional(),
  notes: z.string().max(2000).optional(),
});

// ─── PATCH /bookings/:id/reschedule ──────────────────────────────────────────

export const rescheduleBookingSchema = z.object({
  startTime: z.string().min(1, 'New start time is required'),
  endTime: z.string().min(1, 'New end time is required'),
});

// ─── PATCH /bookings/:id/cancel ──────────────────────────────────────────────

export const cancelBookingSchema = z.object({
  cancelledReason: z.string().max(500).optional(),
});

// ─── GET /mentors/:id/slots ──────────────────────────────────────────────────

export const slotsQuerySchema = z.object({
  serviceId: z.string().uuid('Invalid service ID'),
  date: z
    .string()
    .regex(datePattern, 'Date must be YYYY-MM-DD')
    .refine(
      (d) => !isNaN(new Date(d + 'T00:00:00Z').getTime()),
      { message: 'Invalid date' }
    ),
});

// ─── Params ──────────────────────────────────────────────────────────────────

export const mentorIdParamSchema = z.object({
  id: z.string().uuid('Invalid mentor ID'),
});

export const bookingIdParamSchema = z.object({
  id: z.string().uuid('Invalid booking ID'),
});
