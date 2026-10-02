import { z } from 'zod';

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
