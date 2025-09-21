import { z } from 'zod';

export const loginSchema = z.object({
   email: z.email({ error: 'Invalid email' }).trim(),
   role: z.enum(['Individual', 'Admin']),
});

export const formSchema = z.object({
   id: z.string().optional(),
   title: z.string().min(3, 'Title must be at least 3 characters.').trim(),
   description: z.string().trim().optional(),
   fieldsCount: z.number().int().min(0).max(50, 'Field count must be between 0 and 50.'),
   status: z.enum(['draft', 'active', 'archived']),
   updatedAt: z.string().optional(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type FormSchemaType = z.infer<typeof formSchema>;
