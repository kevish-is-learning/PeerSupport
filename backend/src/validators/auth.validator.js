import { z } from 'zod';

// Common email schema
const emailSchema = z
  .string({ required_error: 'Email is required' })
  .email('Invalid email format')
  .transform((email) => email.toLowerCase());

// Common password schema
const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(6, 'Password must be at least 6 characters long');

// Register validation schema
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().nullable(),
});

// Login validation schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters long'),
});

// Change password validation schema
export const changePasswordSchema = z.object({
  currentPassword: z.string({ required_error: 'Current password is required' }).min(6, 'Current password must be at least 6 characters long'),
  newPassword: passwordSchema,
});

// Validate function helper
export const validateAuth = {
  register: (data) => registerSchema.parse(data),
  login: (data) => loginSchema.parse(data),
  changePassword: (data) => changePasswordSchema.parse(data),
};

export default {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  validateAuth,
};
