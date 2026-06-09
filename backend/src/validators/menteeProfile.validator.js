import { z } from 'zod';

const normalizeOptionalText = z
  .union([z.string(), z.null()])
  .optional()
  .transform((value) => {
    if (typeof value === 'undefined') return undefined;
    if (value === null) return null;

    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  });

const dateOfBirthSchema = z
  .coerce
  .date({
    required_error: 'Date of birth is required',
    invalid_type_error: 'Date of birth must be a valid date',
  })
  .refine((value) => value <= new Date(), 'Date of birth cannot be in the future');

const contactNumberSchema = z
  .string({ required_error: 'Contact number is required' })
  .trim()
  .min(7, 'Contact number must be at least 7 characters long')
  .max(20, 'Contact number must be at most 20 characters long')
  .refine((value) => /^[+0-9()\-\s]+$/.test(value), 'Contact number can only include digits and +()- characters');

const otherMbaScoreSchema = z.preprocess(
  (value) => {
    if (typeof value === 'undefined' || value === null || value === '') {
      return undefined;
    }

    const parsed = Number(value);
    return Number.isNaN(parsed) ? value : parsed;
  },
  z
    .number({ invalid_type_error: 'Other MBA score must be a number' })
    .min(0, 'Other MBA cumulative score must be >= 0')
    .max(100, 'Other MBA cumulative score must be <= 100')
    .optional()
);

const optionalResumePathSchema = z
  .union([z.string().trim(), z.null()])
  .optional()
  .refine(
    (value) => {
      if (typeof value === 'undefined' || value === null) {
        return true;
      }

      return value.startsWith('/uploads/') || /^https?:\/\//i.test(value);
    },
    'Resume must be a valid URL or uploaded file path'
  );

const optionalUrlSchema = z
  .union([z.string().trim(), z.null()])
  .optional()
  .transform((value) => {
    if (typeof value === 'undefined' || value === null) return undefined;
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
  });

const skillsetsSchema = z.preprocess(
  (value) => {
    if (typeof value === 'undefined' || value === null || value === '') {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed.length) {
        return [];
      }

      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (_error) {
        // Fall back to comma-separated parsing.
      }

      return trimmed.split(',').map((item) => item.trim());
    }

    return value;
  },
  z.array(z.string().trim().min(1, 'Skill cannot be empty')).max(100, 'Too many skills provided')
);

const updateSkillsetsSchema = z.preprocess(
  (value) => {
    if (typeof value === 'undefined') {
      return undefined;
    }

    if (value === null || value === '') {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (!trimmed.length) {
        return [];
      }

      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch (_error) {
        // Fall back to comma-separated parsing.
      }

      return trimmed.split(',').map((item) => item.trim());
    }

    return value;
  },
  z.array(z.string().trim().min(1, 'Skill cannot be empty')).max(100, 'Too many skills provided').optional()
);

export const createMenteeProfileSchema = z.object({
  name: z.string().min(1, 'Full name is required').trim(),
  dateOfBirth: dateOfBirthSchema,
  contactNumber: contactNumberSchema,
  education: z.preprocess(
    (value) => (typeof value === 'string' ? JSON.parse(value) : value),
    z.array(z.object({
      type: z.enum(['10th', '12th', 'Graduation', 'Post Graduation']),
      institutionName: z.string().min(1, "Institution name is required"),
      fromYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
      toYear: z.coerce.number().min(1900).max(new Date().getFullYear() + 10),
      score: z.coerce.number().min(0).max(100),
    }))
  ).default([]),
  otherMbaScore: otherMbaScoreSchema,
  workExperience: normalizeOptionalText,
  certifications: normalizeOptionalText,
  catHistory: z.preprocess(
    (value) => (typeof value === 'string' ? JSON.parse(value) : value),
    z.object({
      LRDI: z.coerce.number().min(0).max(100).optional(),
      VARC: z.coerce.number().min(0).max(100).optional(),
      Quants: z.coerce.number().min(0).max(100).optional(),
    }).nullable()
  ).optional(),
  resumeUrl: optionalResumePathSchema,
  profilePhotoUrl: optionalUrlSchema,
});

export const updateMenteeProfileSchema = z.object({
  name: z.string().min(1, 'Full name is required').trim().optional(),
  dateOfBirth: dateOfBirthSchema.optional(),
  contactNumber: contactNumberSchema.optional(),
  education: z.preprocess(
    (value) => (typeof value === 'string' ? JSON.parse(value) : value),
    z.array(z.object({
      type: z.enum(['10th', '12th', 'Graduation', 'Post Graduation']),
      institutionName: z.string().min(1, "Institution name is required"),
      fromYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
      toYear: z.coerce.number().min(1900).max(new Date().getFullYear() + 10),
      score: z.coerce.number().min(0).max(100),
    }))
  ).optional(),
  otherMbaScore: otherMbaScoreSchema,
  workExperience: normalizeOptionalText,
  certifications: normalizeOptionalText,
  expectations: normalizeOptionalText,
  linkedInUrl: normalizeOptionalText,
  catHistory: z.preprocess(
    (value) => (typeof value === 'string' ? JSON.parse(value) : value),
    z.object({
      LRDI: z.coerce.number().min(0).max(100).optional(),
      VARC: z.coerce.number().min(0).max(100).optional(),
      Quants: z.coerce.number().min(0).max(100).optional(),
    }).nullable()
  ).optional(),
  resumeUrl: optionalResumePathSchema,
  profilePhotoUrl: optionalUrlSchema,
});

export default {
  createMenteeProfileSchema,
  updateMenteeProfileSchema,
};
