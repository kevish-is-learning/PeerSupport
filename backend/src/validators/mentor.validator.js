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

// Exam score schema
const examSchema = z.object({
  examName: z.string().min(1, 'Exam name is required'),
  score: z.number().positive('Score must be positive'),
  year: z.number().int().min(2000).max(new Date().getFullYear()),
  percentile: z.number().min(0).max(100).optional(),
});

// Submit mentor application schema
export const submitMentorApplicationSchema = z.object({
  // Step 1: Personal Details & Social Links
  bio: z.string({ required_error: 'Bio is required' }).min(10, 'Bio must be at least 10 characters'),
  headline: z.string().optional(),
  phone: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  location: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).max(5, 'Maximum 5 social links allowed').optional().default([]),
  verificationIds: z.array(z.string()).optional().default([]),

  // Step 2: Expertise
  expertise: z.array(z.string()).min(1, 'At least one expertise is required'),

  // Step 3: Education
  bachelors: educationSchema,
  masters: educationSchema,

  // Step 4: Work Experience
  workExperience: z.array(workExperienceSchema).optional().default([]),

  // Step 5: Exam Scores
  exams: z.array(examSchema).optional().default([]),

  // Step 6: Certifications
  certifications: z.array(certificationSchema).optional().default([]),

  // Step 7: Resumes
  resumes: z.array(resumeSchema).optional().default([]),
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
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  location: z.string().optional(),
  socialLinks: z.array(socialLinkSchema).max(5, 'Maximum 5 social links allowed').optional(),
  verificationIds: z.array(z.string()).optional(),
  expertise: z.array(z.string()).min(1, 'At least one expertise is required').optional(),
  certifications: z.array(certificationSchema).optional(),
  reschedulePolicy: z.coerce.number().int().positive('Reschedule policy must be a positive number').optional(),
  cancellationPolicy: z.coerce.number().int().positive('Cancellation policy must be a positive number').optional(),
  refundPolicy: z.string().optional(),
  workExperience: z.array(workExperienceSchema).optional(),
  bachelors: educationSchema,
  masters: educationSchema,
  exams: z.array(examSchema).optional(),
});

// Service schemas
export const createServiceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title too long'),
  shortDescription: z.string().min(10, 'Description must be at least 10 characters').max(200, 'Description must be less than 200 characters'),
  longDescription: z.string().max(2000, 'Long description must be less than 2000 characters').optional(),
  price: z.number().positive('Price must be a positive number'),
  duration: z.number().int().min(15, 'Duration must be at least 15 minutes').max(240, 'Duration cannot exceed 240 minutes'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).optional().default('DRAFT'),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional().default([]),
  category: z.string().optional(),
});

export const updateServiceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title too long').optional(),
  shortDescription: z.string().min(10, 'Description must be at least 10 characters').max(200, 'Description must be less than 200 characters').optional(),
  longDescription: z.string().max(2000, 'Long description must be less than 2000 characters').optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  duration: z.number().int().min(15, 'Duration must be at least 15 minutes').max(240, 'Duration cannot exceed 240 minutes').optional(),
  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').optional(),
  category: z.string().optional(),
});

export const toggleServiceStatusSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT'], { required_error: 'Status is required' }),
});

export const getServicesQuerySchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).optional(),
  category: z.string().optional(),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(20),
});

// Validate function helper
export const validateMentor = {
  submitApplication: (data) => submitMentorApplicationSchema.parse(data),
  updateApplication: (data) => updateMentorApplicationSchema.parse(data),
  updateProfile: (data) => updateMentorProfileSchema.parse(data),
  createService: (data) => createServiceSchema.parse(data),
  updateService: (data) => updateServiceSchema.parse(data),
  toggleServiceStatus: (data) => toggleServiceStatusSchema.parse(data),
  getServicesQuery: (data) => getServicesQuerySchema.parse(data),
};

export default {
  submitMentorApplicationSchema,
  updateMentorApplicationSchema,
  updateMentorProfileSchema,
  createServiceSchema,
  updateServiceSchema,
  toggleServiceStatusSchema,
  getServicesQuerySchema,
  validateMentor,
  socialLinkSchema,
  workExperienceSchema,
  resumeSchema,
  certificationSchema,
  educationSchema,
  examSchema,
};
