import { z } from 'zod'

// Ported from drf-web/schemas/auth.schemas.ts. The original wove next-intl
// translation functions into Zod messages; this version uses plain English
// strings. When we wire Paraglide validation messages back in, we'll override
// per call site via setError().

const baseAuthSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Valid email is required'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.number().min(1, 'Role is required'),
})

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})
export type LoginSchema = z.infer<typeof loginSchema>

export const registerUserSchema = baseAuthSchema
  .extend({
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })
export type RegisterUserSchema = z.infer<typeof registerUserSchema>

export const createUserSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Valid email is required'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
    role: z.number().min(1, 'Role is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })
export type CreateUserSchema = z.infer<typeof createUserSchema>

export const forgotPasswordSchema = z
  .object({
    email: z.string().min(1, 'Email is required').email('Valid email is required'),
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Passwords don't match",
  })
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
