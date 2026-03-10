import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email format")
    .transform((e) => e.toLowerCase()),
  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email format")
    .transform((e) => e.toLowerCase()),
  password: z
    .string({ error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Name is required"),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ error: "Current password is required" })
      .min(6, "Must be at least 6 characters"),
    newPassword: z
      .string({ error: "New password is required" })
      .min(6, "Must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
