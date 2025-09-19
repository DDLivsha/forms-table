'use client';
import React from 'react';
import Link from 'next/link';

interface Props {
   children: React.ReactNode;
   href?: string; 
   className?: string;
   type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<Props> = ({ children, href, className, ...props }) => {
   const baseClasses =
      'inline-flex cursor-pointer items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition ease-in-out duration-300';

   if (href) {
      return (
         <Link
            href={href}
            className={`${baseClasses} ${className || ''}`}
            {...props}
         >
            {children}
         </Link>
      );
   }

   return (
      <button
         className={`${baseClasses} ${className || ''}`}
         {...props}
      >
         {children}
      </button>
   );
};

export default Button;
