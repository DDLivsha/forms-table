'use client';

import { useEffect } from 'react';
import { useNotificationStore } from '@/lib/store/notificationStore';

export default function Toast() {
   const { message, type, hideNotification } = useNotificationStore();

   useEffect(() => {
      if (message) {
         
         const timeout = setTimeout(() => {
            hideNotification();
         }, 2000);

         return () => clearTimeout(timeout);
      }
   }, [message, hideNotification]);

   if (!message) {
      return null;
   }

   const baseClasses =
      'fixed bottom-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg text-white font-medium shadow-lg transition-all duration-300 transform';
   const successClasses = 'bg-green-500';
   const errorClasses = 'bg-red-500';

   return (
      <div className={`${baseClasses} ${type === 'success' ? successClasses : errorClasses}`}>
         {message}
      </div>
   );
}
