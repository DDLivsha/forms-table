'use client';
import Button from '@/components/Button';
import { useEffect } from 'react';

interface ErrorProps {
   error: Error;
   reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <div className='flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center'>
         <h2 className='text-2xl font-bold mb-4 text-red-600'>Something went wrong!</h2>
         <p className='text-gray-700 mb-6'>
            We could not load the forms dashboard. Please try again later.
         </p>
         <Button onClick={() => reset()}>Try again</Button>
      </div>
   );
}
