import { z } from "zod";

const socialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Invalid URL"),
});

const workExperienceSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  description: z.string().optional(),
});

const resumeSchema = z.object({
  name: z.string().min(1, "Resume name is required"),
  fileUrl: z.string().url("Invalid file URL"),
});

// Step 1: Personal Details
export const step1Schema = z.object({
  bio: z
    .string({ error: "Bio is required" })
    .min(10, "Bio must be at least 10 characters"),
  headline: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  socialLinks: z
    .array(socialLinkSchema)
    .max(5, "Maximum 5 social links")
    .optional()
    .default([]),
});

// Step 2: Expertise
export const step2Schema = z.object({
  expertise: z
    .array(z.string().min(1))
    .min(1, "At least one expertise is required"),
});

// Step 3: Education
export const step3Schema = z.object({
  education10th: z.array(z.string()).optional().default([]),
  education12th: z.array(z.string()).optional().default([]),
  bachelors: z.array(z.string()).optional().default([]),
  masters: z.array(z.string()).optional().default([]),
});

// Step 4: Work Experience
export const step4Schema = z.object({
  workExperience: z.array(workExperienceSchema).optional().default([]),
});

// Step 5: CAT Score
export const step5Schema = z.object({
  catScore: z.coerce.number().positive().optional().nullable(),
  catYear: z.coerce
    .number()
    .int()
    .min(2000)
    .max(new Date().getFullYear())
    .optional()
    .nullable(),
  catPercentile: z.coerce.number().min(0).max(100).optional().nullable(),
});

// Step 6: Certifications
export const step6Schema = z.object({
  certifications: z.array(z.string()).optional().default([]),
});

// Step 7: Resumes & Pricing
export const step7Schema = z.object({
  resumes: z.array(resumeSchema).optional().default([]),
  pricePerSession: z.coerce
    .number({ error: "Price per session is required" })
    .positive("Price must be positive"),
});

// Full application schema
export const mentorApplicationSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  headline: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).max(5).optional().default([]),
  expertise: z.array(z.string()).min(1, "At least one expertise is required"),
  education10th: z.array(z.string()).optional().default([]),
  education12th: z.array(z.string()).optional().default([]),
  bachelors: z.array(z.string()).optional().default([]),
  masters: z.array(z.string()).optional().default([]),
  workExperience: z.array(workExperienceSchema).optional().default([]),
  catScore: z.coerce.number().positive().optional().nullable(),
  catYear: z.coerce.number().int().min(2000).max(new Date().getFullYear()).optional().nullable(),
  catPercentile: z.coerce.number().min(0).max(100).optional().nullable(),
  certifications: z.array(z.string()).optional().default([]),
  resumes: z.array(resumeSchema).optional().default([]),
  pricePerSession: z.coerce.number().positive("Price must be positive"),
});

// Slot creation
export const createSlotsSchema = z.object({
  slots: z
    .array(
      z.object({
        startTime: z.string().min(1),
        endTime: z.string().min(1),
      })
    )
    .min(1, "At least one slot is required"),
});

export type MentorApplicationInput = z.infer<typeof mentorApplicationSchema>;
export type Step1Input = z.infer<typeof step1Schema>;
export type Step2Input = z.infer<typeof step2Schema>;
export type Step3Input = z.infer<typeof step3Schema>;
export type Step4Input = z.infer<typeof step4Schema>;
export type Step5Input = z.infer<typeof step5Schema>;
export type Step6Input = z.infer<typeof step6Schema>;
export type Step7Input = z.infer<typeof step7Schema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type WorkExperience = z.infer<typeof workExperienceSchema>;
export type Resume = z.infer<typeof resumeSchema>;
