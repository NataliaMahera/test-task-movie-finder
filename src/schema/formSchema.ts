import { z } from 'zod';

const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/;

export const BaseFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email()
    .regex(emailRegex, { message: 'Must be a valid email' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be atleast 6 characters' }),
});

export const SignUpSchema = BaseFormSchema.extend({
    username: z.string().min(1, { message: 'Name is required' }),
  });
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const LogInSchema = BaseFormSchema;
export type LogInSchemaType = z.infer<typeof LogInSchema>;