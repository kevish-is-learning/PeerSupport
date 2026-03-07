import { z } from 'zod';

// Valid roles enum
const RoleEnum = z.enum(['MENTOR', 'MENTEE', 'ADMIN'], {
  errorMap: () => ({ message: 'Invalid role. Must be MENTOR, MENTEE, or ADMIN' }),
});

// Email schema
const emailSchema = z
  .string({ required_error: 'Email is required' })
  .email('Invalid email format')
  .transform((email) => email.toLowerCase());

// Password schema
const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(6, 'Password must be at least 6 characters long');

// Create user validation schema (admin only)
export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().optional().nullable(),
  role: RoleEnum.optional().default('MENTEE'),
  isVerified: z.boolean().optional().default(false),
});

// Update user validation schema
export const updateUserSchema = z.object({
  name: z.string().optional(),
  profilePicture: z.string().url('Invalid URL format').optional().nullable(),
  role: RoleEnum.optional(),
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
});

// Update role validation schema
export const updateRoleSchema = z.object({
  role: RoleEnum,
});

// Get all users query validation schema
export const getAllUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  role: RoleEnum.optional(),
  isActive: z.coerce.boolean().optional(),
  search: z.string().optional(),
});

// Toggle status validation schema
export const toggleStatusSchema = z.object({
  isActive: z.boolean({ required_error: 'isActive is required' }),
});

// Validate function helper
export const validateUser = {
  createUser: (data) => createUserSchema.parse(data),
  updateUser: (data) => updateUserSchema.parse(data),
  updateRole: (data) => updateRoleSchema.parse(data),
  getAllUsersQuery: (data) => getAllUsersQuerySchema.parse(data),
  toggleStatus: (data) => toggleStatusSchema.parse(data),
};

export default {
  createUserSchema,
  updateUserSchema,
  updateRoleSchema,
  getAllUsersQuerySchema,
  toggleStatusSchema,
  validateUser,
  RoleEnum,
};
