import Select from '@/components/Select';
import React from 'react';

const SkeletonRow = () => (
   <tr className='bg-white border-b animate-pulse'>
      <td className='px-6 py-4'>
         <div className='h-4 bg-gray-200 rounded w-3/4'></div>
      </td>
      <td className='px-6 py-4'>
         <div className='h-4 bg-gray-200 rounded w-1/2'></div>
      </td>
      <td className='px-6 py-4'>
         <div className='h-4 bg-gray-200 rounded w-1/4'></div>
      </td>
   </tr>
);

export default function loading() {
   return (
      <div className='container mx-auto p-4'>
         <div className='flex items-center gap-4 justify-between'>
            <h1 className='text-3xl font-bold'>Forms Dashboard</h1>
         </div>
         <div className='container mx-auto p-4'>
            <div className='mb-4 max-w-70 h-[39px] bg-gray-200 animate-pulse rounded-md'></div>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
               <table className='w-full text-sm text-left text-gray-500 rounded-lg overflow-hidden shadow-md'>
                  <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                     <tr>
                        <th
                           scope='col'
                           className='px-6 py-3'
                        >
                           Title
                        </th>
                        <th
                           scope='col'
                           className='px-6 py-3'
                        >
                           Status
                        </th>
                        <th
                           scope='col'
                           className='px-6 py-3'
                        >
                           Updated At
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     <SkeletonRow />
                     <SkeletonRow />
                     <SkeletonRow />
                     <SkeletonRow />
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
}
