import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Password must be at least 6 characters"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// User Profile Schemas
export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  profilePicture: z.string().url().optional().or(z.literal("")),
});

// Mentee Profile Schema
export const menteeProfileSchema = z.object({
  dob: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]).optional(),
  education10th: z.array(z.string()).optional(),
  education12th: z.array(z.string()).optional(),
  bachelors: z.array(z.string()).optional(),
  masters: z.array(z.string()).optional(),
  workExperience: z.string().optional(),
  certifications: z.array(z.string()).optional(),
  catAttempts: z.array(z.object({
    year: z.number(),
    score: z.number(),
    percentile: z.number(),
  })).optional(),
  expectations: z.string().optional(),
  targetColleges: z.string().optional(),
});

// Mentor Application Schema
export const mentorApplicationSchema = z.object({
  // Step 1: Personal Details
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  headline: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url(),
  })).max(5).optional(),
  
  // Step 2: Expertise
  expertise: z.array(z.string()).min(1, "Select at least one area of expertise"),
  
  // Step 3: Education
  education10th: z.array(z.string()).optional(),
  education12th: z.array(z.string()).optional(),
  bachelors: z.array(z.string()).optional(),
  masters: z.array(z.string()).optional(),
  
  // Step 4: Work Experience
  workExperience: z.array(z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  
  // Step 5: CAT Score
  catScore: z.number().optional(),
  catYear: z.number().optional(),
  catPercentile: z.number().optional(),
  
  // Step 6: Certifications
  certifications: z.array(z.string()).optional(),
  
  // Step 7: Pricing
  pricePerSession: z.number().min(100, "Minimum price is ₹100"),
});

// Booking Schema
export const createBookingSchema = z.object({
  mentorId: z.string().uuid(),
  slotId: z.string().uuid(),
  sessionMode: z.enum(["VIDEO", "AUDIO", "CHAT"]),
  purpose: z.string().min(10, "Purpose must be at least 10 characters"),
  shareProfile: z.boolean().optional(),
});

// Review Schema
export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

// Slot Schema
export const createSlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
});

export const createSlotsSchema = z.object({
  slots: z.array(createSlotSchema).min(1, "At least one slot is required"),
});

// Withdrawal Schema
export const withdrawalSchema = z.object({
  amount: z.number().min(500, "Minimum withdrawal is ₹500"),
  paymentMethod: z.enum(["bank_transfer", "upi"]),
  bankDetails: z.object({
    accountNumber: z.string(),
    ifsc: z.string(),
    accountName: z.string(),
    bankName: z.string(),
  }).optional(),
  upiId: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === "bank_transfer" && !data.bankDetails) {
    return false;
  }
  if (data.paymentMethod === "upi" && !data.upiId) {
    return false;
  }
  return true;
}, {
  message: "Payment details are required",
});

// Admin Schemas
export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["MENTEE", "MENTOR", "ADMIN"]),
  isVerified: z.boolean().optional(),
});

export const updateUserRoleSchema = z.object({
  role: z.enum(["MENTEE", "MENTOR", "ADMIN"]),
});
