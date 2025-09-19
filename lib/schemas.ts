import { z } from 'zod';

export const loginSchema = z.object({
   email: z.email({ error: 'Invalid email' }),
   role: z.enum(['Individual', 'Admin']),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
