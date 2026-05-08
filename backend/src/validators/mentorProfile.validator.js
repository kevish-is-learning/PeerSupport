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

const linkedInUrlSchema = normalizeOptionalText.pipe(
  z.string().url("LinkedIn URL must be a valid URL").optional().nullable(),
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

const optionalUrlSchema = z
  .union([z.string().trim(), z.null()])
  .optional()
  .refine((value) => {
    if (typeof value === "undefined" || value === null) {
      return true;
    }

    return value.startsWith("/uploads/") || /^https?:\/\//i.test(value);
  }, "Must be a valid URL or uploaded file path");

/**
 * Profile schema — services / pricing / availability are handled by their own
 * dedicated endpoints now, so they are NOT part of this schema.
 */
export const createMentorProfileSchema = z.object({
  linkedInUrl: linkedInUrlSchema,
  contactNumber: contactNumberSchema,
  bio: bioSchema,
  expertiseTags: expertiseTagsSchema,
  ugCollegeProfile: normalizeOptionalText,
  pgProfile: normalizeOptionalText,
  workExperience: normalizeOptionalText,
  certifications: normalizeOptionalText,
  profilePhotoUrl: optionalUrlSchema,
  collegeDocumentUrl: optionalUrlSchema,
});

export const updateMentorProfileSchema = createMentorProfileSchema;

export const updateMentorApprovalSchema = z.object({
  approvalStatus: z.enum(["APPROVED", "REJECTED"]),
  adminReviewNotes: normalizeOptionalText,
});

export default {
  createMentorProfileSchema,
  updateMentorProfileSchema,
  updateMentorApprovalSchema,
};
