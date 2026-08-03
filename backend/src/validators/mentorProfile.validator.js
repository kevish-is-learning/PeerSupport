import { z } from "zod";

const normalizeOptionalText = z
  .union([z.string(), z.null()])
  .optional()
  .transform((value) => {
    if (typeof value === "undefined") return undefined;
    if (value === null) return null;

    const trimmed = value.trim();
    return trimmed.length ? trimmed : null;
  });

const linkedInUrlSchema = z.preprocess(
  (val) => {
    if (typeof val === 'string') {
      const trimmed = val.trim();
      return trimmed === '' ? null : trimmed;
    }
    return val;
  },
  z.string().url("LinkedIn URL must be a valid URL").optional().nullable()
);

const contactNumberSchema = z
  .string({ required_error: "Contact number is required" })
  .trim()
  .min(7, "Contact number must be at least 7 characters long")
  .max(20, "Contact number must be at most 20 characters long")
  .refine(
    (value) => /^[+0-9()\-\s]+$/.test(value),
    "Contact number can only include digits and +()- characters",
  );

const bioSchema = z
  .string({ required_error: "Bio is required" })
  .trim()
  .min(10, "Bio must be at least 10 characters long");

const makeTagsArraySchema = (itemErrorMsg) =>
  z.preprocess(
    (value) => {
      if (Array.isArray(value)) {
        return value;
      }

      if (typeof value === "string") {
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
          // Fallback to comma-separated parsing.
        }

        return trimmed.split(",").map((item) => item.trim());
      }

      return value;
    },
    z
      .array(z.string().trim().min(1, itemErrorMsg))
      .optional()
      .default([]),
  );

const expertiseTagsSchema = makeTagsArraySchema("Expertise tag cannot be empty");

const fullNameSchema = z.string().trim().min(2, "Full name must be at least 2 characters").max(100);

const parseJsonField = (schema) => z.preprocess((value) => {
  if (typeof value !== 'string') return value;
  try { return JSON.parse(value); } catch { return value; }
}, schema);

const educationSchema = parseJsonField(z.object({
  mba: z.object({ college: z.string().trim().min(2).max(120), specialization: z.string().trim().max(120).optional().default(''), graduationYear: z.coerce.number().int().min(1950).max(new Date().getFullYear() + 10) }),
  undergraduate: z.object({ college: z.string().trim().min(2).max(120), degree: z.string().trim().min(2).max(120), specialization: z.string().trim().max(120).optional().default(''), graduationYear: z.coerce.number().int().min(1950).max(new Date().getFullYear() + 10) }),
}));

const professionalExperienceSchema = parseJsonField(z.object({
  hasExperience: z.boolean(),
  years: z.coerce.number().min(0).max(60).optional(),
  company: z.string().trim().max(120).optional(),
  role: z.string().trim().max(120).optional(),
}).superRefine((value, ctx) => {
  if (value.hasExperience && (!value.years || !value.company || !value.role)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Years, company, and role are required when work experience is selected' });
  }
}));

const mentoringQASchema = parseJsonField(z.object({
  q1: z.string().trim().min(30).max(1500),
  q2: z.string().trim().min(30).max(1500),
  q3: z.string().trim().min(30).max(1500),
}));

const optionalUrlSchema = z
  .union([z.string().trim(), z.null()])
  .optional()
  .refine((value) => {
    if (typeof value === "undefined" || value === null) {
      return true;
    }

    return value.startsWith("/uploads/") || /^https:\/\/res\.cloudinary\.com\//i.test(value);
  }, "Must reference an application-managed upload");


/**
 * Profile schema — services / pricing / availability are handled by their own
 * dedicated endpoints now, so they are NOT part of this schema.
 */
export const createMentorProfileSchema = z.object({
  fullName: fullNameSchema,
  linkedInUrl: linkedInUrlSchema,
  contactNumber: contactNumberSchema,
  bio: bioSchema,
  expertiseTags: expertiseTagsSchema.refine((tags) => tags.length > 0, 'Select at least one area of expertise'),
  ugCollegeProfile: normalizeOptionalText,
  pgProfile: normalizeOptionalText,
  workExperience: normalizeOptionalText,
  certifications: normalizeOptionalText,
  profilePhotoUrl: optionalUrlSchema.refine((value) => Boolean(value), 'Profile photo is required'),
  collegeDocumentUrl: optionalUrlSchema,
  education: educationSchema,
  professionalExperience: professionalExperienceSchema,
  mentoringQA: mentoringQASchema,
});

export const updateMentorProfileSchema = createMentorProfileSchema.partial();

export const updateMentorApprovalSchema = z.object({
  approvalStatus: z.enum(["APPROVED", "REJECTED"]),
  adminReviewNotes: z.string().trim().max(2000).optional().nullable(),
});

export default {
  createMentorProfileSchema,
  updateMentorProfileSchema,
  updateMentorApprovalSchema,
};
