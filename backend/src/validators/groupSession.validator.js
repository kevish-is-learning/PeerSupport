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

export const verifyGroupPaymentSchema = z.object({
  registrationId: z.string().uuid('Invalid registration ID'),
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
