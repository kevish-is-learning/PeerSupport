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

const skillsetsSchema = z
  .array(z.string().trim().min(1, 'Skill cannot be empty'))
  .max(100, 'Too many skills provided')
  .optional()
  .transform((value) => value ?? []);

export const createMenteeProfileSchema = z.object({
  dateOfBirth: dateOfBirthSchema,
  education10: normalizeOptionalText,
  education12: normalizeOptionalText,
  bachelors: normalizeOptionalText,
  masters: normalizeOptionalText,
  workExperience: normalizeOptionalText,
  certifications: normalizeOptionalText,
  skillsets: skillsetsSchema,
  catHistory: normalizeOptionalText,
  resumeUrl: normalizeOptionalText,
});

export const updateMenteeProfileSchema = z.object({
  dateOfBirth: dateOfBirthSchema.optional(),
  education10: normalizeOptionalText,
  education12: normalizeOptionalText,
  bachelors: normalizeOptionalText,
  masters: normalizeOptionalText,
  workExperience: normalizeOptionalText,
  certifications: normalizeOptionalText,
  skillsets: z.array(z.string().trim().min(1, 'Skill cannot be empty')).max(100, 'Too many skills provided').optional(),
  catHistory: normalizeOptionalText,
  resumeUrl: normalizeOptionalText,
});

export default {
  createMenteeProfileSchema,
  updateMenteeProfileSchema,
};
