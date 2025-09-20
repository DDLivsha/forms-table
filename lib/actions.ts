'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { FormSchemaType, formSchema } from './schemas';
import { revalidatePath } from 'next/cache';
import { createForm, updateForm, deleteForm } from './api';

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

      const result = await createForm(validatedData.data);

      if (result.error) {
         throw new Error(result.error);
      }

      revalidatePath('/forms');
      return { message: result.message };
   } catch (error) {
      console.error('Error creating form:', error);
      return { error: 'An unexpected error occurred.' };
   }
}

export async function deleteFormAction(id: string) {
   try {
      const result = await deleteForm(id);

      if (result.error) {
         throw new Error(result.error);
      }

      revalidatePath('/forms');
      return { message: result.message };
   } catch (error) {
      console.error('Error deleting form:', error);
      return { error: 'An unexpected error occurred.' };
   }
}

export async function updateFormAction(formData: FormSchemaType) {
   try {
      const validatedData = formSchema.safeParse(formData);

      if (!validatedData.success) {
         return { errors: validatedData.error.flatten().fieldErrors };
      }

      if (!formData.id) {
         return { error: 'Invalid form data.' };
      }

      const result = await updateForm(formData.id, validatedData.data);

      if (result.error) {
         throw new Error(result.error);
      }

      revalidatePath('/forms');
      return { message: result.message };
   } catch (error) {
      console.error('Error updating form:', error);
      return { error: 'An unexpected error occurred.' };
   }
}
