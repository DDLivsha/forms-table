'use client';
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
            We could not load the form. Please try again later.
         </p>
         <button
            className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors'
            onClick={() => reset()}
         >
            Try again
         </button>
      </div>
   );
}
