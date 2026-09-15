import { z } from 'zod';

const isoDateTime = z.string().refine((v) => !Number.isNaN(new Date(v).getTime()), {
  message: 'Must be a valid date/time',
});

const endsAfterStart = (data) => {
  if (!data.startsAt || !data.endsAt) return true;
  return new Date(data.endsAt) > new Date(data.startsAt);
};

export const createWebinarSchema = z
  .object({
    title: z.string().trim().min(3, 'Title is required').max(200),
    description: z.string().trim().min(20, 'Description must be at least 20 characters').max(5000),
    coverImageUrl: z.string().url('Cover image must be a valid URL').optional().or(z.literal('')),
    hostMentorProfileId: z.string().uuid().optional().nullable(),
    startsAt: isoDateTime,
    endsAt: isoDateTime,
    isPaid: z.boolean().optional().default(false),
    price: z.number().min(0).max(100000).optional().default(0),
    capacity: z.number().int().min(1).max(10000).optional().nullable(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'LIVE', 'COMPLETED', 'CANCELLED']).optional(),
  })
  .refine(endsAfterStart, { message: 'End time must be after start time' })
  .refine((d) => !d.isPaid || d.price > 0, {
    message: 'A paid webinar needs a price above zero',
  });

export const updateWebinarSchema = z
  .object({
    title: z.string().trim().min(3).max(200).optional(),
    description: z.string().trim().min(20).max(5000).optional(),
    coverImageUrl: z.string().url().optional().or(z.literal('')),
    hostMentorProfileId: z.string().uuid().optional().nullable(),
    startsAt: isoDateTime.optional(),
    endsAt: isoDateTime.optional(),
    isPaid: z.boolean().optional(),
    price: z.number().min(0).max(100000).optional(),
    capacity: z.number().int().min(1).max(10000).optional().nullable(),
    status: z.enum(['DRAFT', 'PUBLISHED', 'LIVE', 'COMPLETED', 'CANCELLED']).optional(),
  })
  .refine(endsAfterStart, { message: 'End time must be after start time' });

export const createDiscussionSchema = z
  .object({
    topic: z.string().trim().min(3, 'Topic is required').max(200),
    description: z.string().trim().max(3000).optional(),
    moderatorMentorProfileId: z.string().uuid().optional().nullable(),
    startsAt: isoDateTime,
    endsAt: isoDateTime,
    minParticipants: z.number().int().min(2).max(50).optional().default(6),
    maxParticipants: z.number().int().min(2).max(50).optional().default(12),
    price: z.number().min(0).max(100000).optional().default(0),
    status: z.enum(['SCHEDULED', 'CONFIRMED', 'LIVE', 'COMPLETED', 'CANCELLED']).optional(),
  })
  .refine(endsAfterStart, { message: 'End time must be after start time' })
  .refine((d) => d.maxParticipants >= d.minParticipants, {
    message: 'Maximum participants must be at least the minimum',
  });

export const updateDiscussionSchema = z
  .object({
    topic: z.string().trim().min(3).max(200).optional(),
    description: z.string().trim().max(3000).optional(),
    moderatorMentorProfileId: z.string().uuid().optional().nullable(),
    startsAt: isoDateTime.optional(),
    endsAt: isoDateTime.optional(),
    minParticipants: z.number().int().min(2).max(50).optional(),
    maxParticipants: z.number().int().min(2).max(50).optional(),
    price: z.number().min(0).max(100000).optional(),
    status: z.enum(['SCHEDULED', 'CONFIRMED', 'LIVE', 'COMPLETED', 'CANCELLED']).optional(),
  })
  .refine(endsAfterStart, { message: 'End time must be after start time' });

export const registerDiscussionSchema = z.object({
  shareProfile: z.boolean().optional().default(false),
});

export const verifyGroupPaymentSchema = z.object({
  registrationId: z.string().uuid('Invalid registration ID'),
  razorpayOrderId: z.string().min(1, 'Order ID is required'),
  razorpayPaymentId: z.string().min(1, 'Payment ID is required'),
  razorpaySignature: z.string().min(1, 'Signature is required'),
});

// ─── Packages ────────────────────────────────────────────────────────────────

export const createPackageSchema = z.object({
  mentorServiceId: z.string().uuid('Select a service for this package'),
  title: z.string().trim().min(3, 'Title is required').max(120),
  description: z.string().trim().max(1000).optional(),
  sessionCount: z.number().int().min(2, 'A package needs at least 2 sessions').max(50),
  price: z.number().positive('Price must be greater than zero').max(500000),
  validityDays: z.number().int().min(7).max(730).optional().default(180),
  isActive: z.boolean().optional(),
});

export const updatePackageSchema = z.object({
  title: z.string().trim().min(3).max(120).optional(),
  description: z.string().trim().max(1000).optional(),
  sessionCount: z.number().int().min(2).max(50).optional(),
  price: z.number().positive().max(500000).optional(),
  validityDays: z.number().int().min(7).max(730).optional(),
  isActive: z.boolean().optional(),
});

export const verifyPackagePaymentSchema = z.object({
  purchaseId: z.string().uuid('Invalid purchase ID'),
  razorpayOrderId: z.string().min(1, 'Order ID is required'),
  razorpayPaymentId: z.string().min(1, 'Payment ID is required'),
  razorpaySignature: z.string().min(1, 'Signature is required'),
});

// ─── Mentee documents ────────────────────────────────────────────────────────

export const addDocumentSchema = z
  .object({
    type: z.enum(['RESUME', 'SOP']),
    name: z.string().trim().min(2, 'Give this document a name').max(120),
    fileUrl: z.string().url('A valid file URL is required'),
    targetCollege: z.string().trim().max(160).optional(),
  })
  .refine((d) => d.type !== 'SOP' || Boolean(d.targetCollege), {
    message: 'An SOP needs the college it was written for',
    path: ['targetCollege'],
  });

export const shareDocumentsSchema = z.object({
  documentIds: z.array(z.string().uuid()).max(10).default([]),
});
