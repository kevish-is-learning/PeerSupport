import { z } from 'zod';

const section = (label, min) =>
  z
    .string()
    .trim()
    .min(min, `${label} must be at least ${min} characters`)
    .max(2000, `${label} must be under 2000 characters`);

export const submitFeedbackSchema = z.object({
  strengths: section('Strengths', 20),
  weaknesses: section('Areas for improvement', 20),
  recommendations: section('Recommendations', 20),
});

export const bookingIdParamSchema = z.object({
  bookingId: z.string().uuid('Invalid booking ID'),
});

export const counterpartIdParamSchema = z.object({
  counterpartId: z.string().uuid('Invalid user ID'),
});
