import React, { DetailedHTMLProps, FC, forwardRef, InputHTMLAttributes, useId } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
   error?: FieldError | string;
   label?: string;
}

const Input: FC<Props> = forwardRef(({ className = '', label, id, error, ...props }, ref) => {
   const reactId = useId();
   const inputId = id || props.name || reactId;
   const errorMessage = typeof error === 'string' ? error : error?.message ?? '';

   return (
      <div className={`w-full relative ${className}`}>
         {label && (
            <label
               htmlFor={inputId}
               className='mb-1 block text-[13px] font-normal cursor-pointer'
            >
               {label}
            </label>
         )}

         <input
            ref={ref}
            id={inputId}
            {...props}
            className={`block w-full rounded-md border bg-white px-3.5 py-1.5 text-[16px] font-normal leading-[160%]
            focus:outline-1 focus:outline-indigo-600
            ${error ? 'border-red-500' : 'border-gray-200'}`}
         />

         {errorMessage && (
            <span className='absolute top-full left-0 mt-1 text-[13px] font-normal text-red-500'>
               {errorMessage}
            </span>
         )}
      </div>
   );
});

Input.displayName = 'Input';

export default Input;
