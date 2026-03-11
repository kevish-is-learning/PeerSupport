import { z } from 'zod';

// Get mentors query schema
export const getMentorsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  expertise: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  minRating: z.coerce.number().min(0).max(5).optional(),
});

// Validate function helper
export const validateMentee = {
  getMentorsQuery: (data) => getMentorsQuerySchema.parse(data),
};

export default {
  getMentorsQuerySchema,
  validateMentee,
};
