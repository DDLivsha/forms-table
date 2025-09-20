'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
