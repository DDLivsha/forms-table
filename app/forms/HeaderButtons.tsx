'use client';
import React, { useTransition } from 'react';
import Button from '@/components/Button';
import { signOutAction } from '@/lib/actions';

export default function HeaderButtons({ userRole }: { userRole: 'Admin' | 'Individual' }) {
   const [isPending, startTransition] = useTransition();

   const handleLogout = () => {
      startTransition(() => signOutAction());
   };

   return (
      <div className='flex items-center space-x-4'>
         {userRole === 'Admin' && <Button href='/forms/new'>Create New Form</Button>}
         <Button
            onClick={handleLogout}
            className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
         >
            {isPending ? 'Logging out...' : 'Logout'}
         </Button>
      </div>
   );
}
