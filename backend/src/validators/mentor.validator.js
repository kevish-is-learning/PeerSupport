import { z } from 'zod';

// Social link schema
const socialLinkSchema = z.object({
  platform: z.string().min(1, 'Platform is required'),
  url: z.string().url('Invalid URL format'),
});

// Work experience schema
const workExperienceSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  role: z.string().min(1, 'Role is required'),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()).optional().nullable(),
  description: z.string().optional(),
});

// Resume schema
const resumeSchema = z.object({
  name: z.string().min(1, 'Resume name is required'),
  fileUrl: z.string().url('Invalid file URL'),
});

// Education schema (flexible for 10th, 12th, bachelors, masters)
// Expected format: [instituteName, score, yearOfPassout] for 10th/12th
// Expected format: [degree, instituteName, score, yearOfPassout] for bachelors/masters
const educationSchema = z.array(z.string()).optional().default([]);

// Certification schema (can be string or object)
const certificationSchema = z.union([
  z.string(),
  z.object({
    name: z.string(),
    issuer: z.string().optional(),
    date: z.string().optional(),
    url: z.string().optional(),
  })
]);

// Submit mentor application schema
export const submitMentorApplicationSchema = z.object({
  // Step 1: Personal Details & Social Links
  bio: z.string({ required_error: 'Bio is required' }).min(10, 'Bio must be at least 10 characters'),
  headline: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).max(5, 'Maximum 5 social links allowed').optional().default([]),

  // Step 2: Expertise
  expertise: z.array(z.string()).min(1, 'At least one expertise is required'),

  // Step 3: Education
  education10th: educationSchema,
  education12th: educationSchema,
  bachelors: educationSchema,
  masters: educationSchema,

  // Step 4: Work Experience
  workExperience: z.array(workExperienceSchema).optional().default([]),

  // Step 5: CAT Score
  catScore: z.number().positive().optional().nullable(),
  catYear: z.number().int().min(2000).max(new Date().getFullYear()).optional().nullable(),
  catPercentile: z.number().min(0).max(100).optional().nullable(),

  // Step 6: Certifications
  certifications: z.array(certificationSchema).optional().default([]),

  // Step 7: Resumes
  resumes: z.array(resumeSchema).optional().default([]),

  // Pricing
  pricePerSession: z.coerce.number({ required_error: 'Price per session is required' }).positive('Price must be positive'),
});

// Update mentor application schema (partial)
export const updateMentorApplicationSchema = submitMentorApplicationSchema.partial().extend({
  socialLinks: z.array(socialLinkSchema).max(5, 'Maximum 5 social links allowed').optional(),
});

// Update mentor profile schema
export const updateMentorProfileSchema = z.object({
  bio: z.string().min(10, 'Bio must be at least 10 characters').optional(),
  headline: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).max(5, 'Maximum 5 social links allowed').optional(),
  expertise: z.array(z.string()).min(1, 'At least one expertise is required').optional(),
  certifications: z.array(certificationSchema).optional(),
  pricePerSession: z.coerce.number().positive('Price must be positive').optional(),
  reschedulePolicy: z.coerce.number().int().positive('Reschedule policy must be a positive number').optional(),
  cancellationPolicy: z.coerce.number().int().positive('Cancellation policy must be a positive number').optional(),
  refundPolicy: z.string().optional(),
  workExperience: z.array(workExperienceSchema).optional(),
  education10th: educationSchema,
  education12th: educationSchema,
  bachelors: educationSchema,
  masters: educationSchema,
  catScore: z.number().positive().optional().nullable(),
  catYear: z.number().int().min(2000).max(new Date().getFullYear()).optional().nullable(),
  catPercentile: z.number().min(0).max(100).optional().nullable(),
});

// Slot schema
const slotSchema = z.object({
  startTime: z.string().or(z.date()),
  endTime: z.string().or(z.date()),
});

// Create slots schema
export const createSlotsSchema = z.object({
  slots: z.array(slotSchema).min(1, 'At least one slot is required'),
});

// Update slot schema
export const updateSlotSchema = z.object({
  startTime: z.string().or(z.date()).optional(),
  endTime: z.string().or(z.date()).optional(),
  status: z.enum(['AVAILABLE', 'BOOKED', 'CANCELLED']).optional(),
});

// Get slots query schema
export const getSlotsQuerySchema = z.object({
  status: z.enum(['AVAILABLE', 'BOOKED', 'CANCELLED']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// Get bookings query schema
export const getBookingsQuerySchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED']).optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
});

// Reschedule booking schema
export const rescheduleBookingSchema = z.object({
  newSlotId: z.string({ required_error: 'New slot ID is required' }),
  reason: z.string().optional(),
});

// Validate function helper
export const validateMentor = {
  submitApplication: (data) => submitMentorApplicationSchema.parse(data),
  updateApplication: (data) => updateMentorApplicationSchema.parse(data),
  updateProfile: (data) => updateMentorProfileSchema.parse(data),
  createSlots: (data) => createSlotsSchema.parse(data),
  updateSlot: (data) => updateSlotSchema.parse(data),
  getSlotsQuery: (data) => getSlotsQuerySchema.parse(data),
  getBookingsQuery: (data) => getBookingsQuerySchema.parse(data),
  rescheduleBooking: (data) => rescheduleBookingSchema.parse(data),
};

export default {
  submitMentorApplicationSchema,
  updateMentorApplicationSchema,
  updateMentorProfileSchema,
  createSlotsSchema,
  updateSlotSchema,
  getSlotsQuerySchema,
  getBookingsQuerySchema,
  rescheduleBookingSchema,
  validateMentor,
  socialLinkSchema,
  workExperienceSchema,
  resumeSchema,
  certificationSchema,
  educationSchema,
};
