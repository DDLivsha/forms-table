'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FormSchemaType, formSchema } from './schemas';

export async function loginAction(formData: { email: string; role: 'Individual' | 'Admin' }) {
   const cookieStore = await cookies();

   cookieStore.set('role', formData.role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
   });

   redirect('/forms');
}

export async function signOutAction() {
   const cookieStore = await cookies();

   cookieStore.delete('role');
   redirect('/login');
}

export async function createFormAction(formData: FormSchemaType) {
   try {
      const validatedData = formSchema.safeParse(formData);
      if (!validatedData.success) {
         return { errors: validatedData.error.flatten().fieldErrors };
      }

      const response = await fetch('http://localhost:3000/api/forms', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(validatedData.data),
      });

      if (!response.ok) {
         throw new Error('Failed to create form.');
      }

      return { message: 'Form created successfully!' };
   } catch (error) {
      console.error('Error creating form:', error);
      return { error: 'An unexpected error occurred.' };
   }
}

export async function deleteFormAction(id: string) {
   try {
      const response = await fetch(`http://localhost:3000/api/forms/${id}`, {
         method: 'DELETE',
      });

      if (!response.ok) {
         const errorData = await response.json();
         return { error: errorData.error || 'Failed to delete form.' };
      }

      return { message: 'Form deleted successfully!' };
   } catch (error) {
      console.error('Error deleting form:', error);
      return { error: 'An unexpected error occurred.' };
   }
}
