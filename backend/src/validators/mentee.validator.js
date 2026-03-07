import { z } from 'zod';

// Session mode enum
const SessionModeEnum = z.enum(['VIDEO', 'AUDIO', 'CHAT'], {
  errorMap: () => ({ message: 'Invalid session mode. Must be VIDEO, AUDIO, or CHAT' }),
});

// Booking status enum
const BookingStatusEnum = z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED'], {
  errorMap: () => ({ message: 'Invalid booking status' }),
});

// Create booking schema
export const createBookingSchema = z.object({
  mentorId: z.string({ required_error: 'Mentor ID is required' }),
  slotId: z.string({ required_error: 'Slot ID is required' }),
  sessionMode: SessionModeEnum,
  purpose: z.string({ required_error: 'Purpose is required' }).min(1, 'Purpose is required'),
  shareProfile: z.boolean().optional().default(false),
});

// Get mentors query schema
export const getMentorsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  expertise: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
});

// Get bookings query schema
export const getBookingsQuerySchema = z.object({
  status: BookingStatusEnum.optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
});

// Submit feedback schema
export const submitFeedbackSchema = z.object({
  bookingId: z.string({ required_error: 'Booking ID is required' }),
  rating: z.number({ required_error: 'Rating is required' }).int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().optional(),
});

// Cancel booking schema
export const cancelBookingSchema = z.object({
  reason: z.string().optional(),
});

// Request reschedule schema
export const requestRescheduleSchema = z.object({
  newSlotId: z.string({ required_error: 'New slot ID is required' }),
  reason: z.string().optional(),
});

// Validate function helper
export const validateMentee = {
  createBooking: (data) => createBookingSchema.parse(data),
  getMentorsQuery: (data) => getMentorsQuerySchema.parse(data),
  getBookingsQuery: (data) => getBookingsQuerySchema.parse(data),
  submitFeedback: (data) => submitFeedbackSchema.parse(data),
  cancelBooking: (data) => cancelBookingSchema.parse(data),
  requestReschedule: (data) => requestRescheduleSchema.parse(data),
};

export default {
  createBookingSchema,
  getMentorsQuerySchema,
  getBookingsQuerySchema,
  submitFeedbackSchema,
  cancelBookingSchema,
  requestRescheduleSchema,
  validateMentee,
  SessionModeEnum,
  BookingStatusEnum,
};
