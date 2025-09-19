'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

interface SelectProps {
   options: string[];
   value?: string;
   onChange: (val: string) => void;
   error?: FieldError | string;
   errorText?: string;
   maxWidth?: number;
   disabled?: boolean;
   className?: string;
   placeholder?: string;
   label?: string;
}

const Select: FC<SelectProps> = ({
   options,
   value,
   onChange,
   error,
   errorText,
   maxWidth,
   label,
   disabled = false,
   className = '',
   placeholder = 'Select an option',
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [isDropUp, setIsDropUp] = useState(false);
   const selectRef = useRef<HTMLDivElement>(null);

   const errorMessage = typeof error === 'string' ? error : error?.message || errorText || '';

   const toggleDropdown = () => {
      if (!disabled) setIsOpen((prev) => !prev);
   };

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setIsOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   useEffect(() => {
      if (isOpen && selectRef.current) {
         const rect = selectRef.current.getBoundingClientRect();
         const spaceBelow = window.innerHeight - rect.bottom;
         const spaceAbove = rect.top;
         setIsDropUp(spaceBelow < 200 && spaceAbove > spaceBelow);
      }
   }, [isOpen]);

   return (
      <div
         ref={selectRef}
         className={`relative w-full ${className}`}
         style={maxWidth ? { maxWidth: `${maxWidth}px` } : {}}
      >
         <label className='mb-1 block text-[13px] font-normal cursor-pointer'>{label}</label>
         <div
            className={`flex items-center justify-between rounded-md border px-3.5 py-1.5 bg-white text-[16px] leading-[160%] cursor-pointer ${
               disabled ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'hover:border-indigo-600'
            } ${error ? 'border-red-500' : 'border-gray-200'}`}
            onClick={toggleDropdown}
         >
            {value ? <span>{value}</span> : <span className='text-gray-400'>{placeholder}</span>}
            <span className={`transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  viewBox='0 0 20 20'
                  fill='currentColor'
               >
                  <path
                     fillRule='evenodd'
                     d='M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z'
                     clipRule='evenodd'
                  />
               </svg>
            </span>
         </div>

         {isOpen && (
            <div
               className={`absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg ${
                  isDropUp ? 'bottom-full mb-1' : 'top-full'
               }`}
            >
               {options.length > 0 ? (
                  options.map((item) => (
                     <div
                        key={item}
                        onClick={() => {
                           onChange(item);
                           setIsOpen(false);
                        }}
                        className={`px-3.5 py-2 cursor-pointer hover:bg-indigo-50 ${
                           value === item ? 'bg-indigo-100 text-indigo-600' : ''
                        }`}
                     >
                        {item}
                     </div>
                  ))
               ) : (
                  <div className='px-3.5 py-2 text-center text-gray-400'>No options available</div>
               )}
            </div>
         )}

         {errorMessage && (
            <span className='absolute top-full left-0 mt-1 text-[13px] font-normal text-red-500'>
               {errorMessage}
            </span>
         )}
      </div>
   );
};

Select.displayName = 'Select';

export default Select;
