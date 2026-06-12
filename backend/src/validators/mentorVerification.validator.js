import { z } from 'zod';

// ─── Schedule Verification Call ──────────────────────────────────────────────

export const scheduleCallSchema = z.object({
  mentorProfileId: z.string().uuid('Invalid mentor profile ID'),
  startsAt: z.string().datetime({ message: 'Start time must be an ISO datetime' }),
  durationMinutes: z.number().int().min(5).max(120).default(15),
  notes: z.string().max(2000).optional(),
});

// ─── Reschedule Verification Call ────────────────────────────────────────────

export const rescheduleCallSchema = z.object({
  callId: z.string().uuid('Invalid call ID'),
  startsAt: z.string().datetime({ message: 'Start time must be an ISO datetime' }),
  durationMinutes: z.number().int().min(5).max(120).default(15),
  notes: z.string().max(2000).optional(),
});

// ─── Params ──────────────────────────────────────────────────────────────────

export const callIdParamSchema = z.object({
  callId: z.string().uuid('Invalid call ID'),
});

export const mentorIdParamSchema = z.object({
  mentorProfileId: z.string().uuid('Invalid mentor profile ID'),
});

export default {
  scheduleCallSchema,
  rescheduleCallSchema,
  callIdParamSchema,
  mentorIdParamSchema,
};
