import { z } from 'zod';

export const BaseFormSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' }),
});

export const SignUpSchema = BaseFormSchema.extend({
  username: z.string().trim().min(1, { message: 'Name is required' }),
});

export const LogInSchema = BaseFormSchema;
