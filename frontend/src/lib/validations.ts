import * as z from 'zod'

const passwordSchema = z
  .string()
  .trim()
  .min(8, 'Password must be at least 8 characters long.')
  .max(32, 'Password must be no more than 32 characters long.')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
  .regex(/\d/, 'Password must contain at least one number.')

const emailSchema = z.string().trim().email('Invalid email address').toLowerCase()

export const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  remember: z.boolean().default(false)
})

export const signupFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().trim().min(3, 'Name must be at least 3 characters long.'),
  remember: z.boolean().default(false)
})

export const workflowFormSchema = z.object({
  name: z.string().trim().min(3, 'Name must be at least 3 characters long.'),
  description: z
    .string()
    .trim()
    .min(3, 'Description must be at least 3 characters long.')
    .max(256, 'Description must be no more than 256 characters long.')
})
