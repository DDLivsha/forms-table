'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function HeaderButtons({ userRole }: { userRole: 'Admin' | 'Individual' }) {
   const router = useRouter();

   const handleLogout = async () => {
      // Ми ще не створювали цю логіку, але вона буде виглядати так:
      // document.cookie = 'role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      // router.push('/login');
   };

   return (
         <div className='flex items-center space-x-4'>
            {userRole === 'Admin' && (
               <Button
                  href='/forms/new'
               >
                  Create New Form
               </Button>
            )}
            <Button
               onClick={handleLogout}
               className='px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700'
            >
               Logout
            </Button>
         </div>
   );
}
