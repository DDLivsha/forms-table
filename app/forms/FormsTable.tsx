'use client';
import { useState, useMemo, useTransition } from 'react';
import Link from 'next/link';
import Select from '@/components/Select';
import { deleteFormAction } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { IForm } from '@/interfaces/form';
import { useNotificationStore } from '@/lib/store/notificationStore';

interface FormsTableProps {
   initialForms: IForm[];
   userRole: 'Admin' | 'Individual';
}

export default function FormsTable({ initialForms, userRole }: FormsTableProps) {
   const router = useRouter();
   const { showNotification } = useNotificationStore();

   const [statusFilter, setStatusFilter] = useState('');
   const [sortDirection, setSortDirection] = useState<'ascending' | 'descending' | 'none'>(
      'descending'
   );
   const [isDeleting, startTransition] = useTransition();

   const sortedAndFilteredForms = useMemo(() => {
      let filtered = initialForms.filter((form) => {
         const matchesStatus = statusFilter === '' || form.status === statusFilter;
         return matchesStatus;
      });

      filtered.sort((a, b) => {
         if (sortDirection === 'ascending') {
            return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
         } else if (sortDirection === 'descending') {
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
         }
         return 0;
      });

      return filtered;
   }, [initialForms, statusFilter, sortDirection]);

   const handleSort = () => {
      setSortDirection((prevDirection) =>
         prevDirection === 'descending' ? 'ascending' : 'descending'
      );
   };

   const handleDelete = async (id: string) => {
      if (!window.confirm('Are you sure you want to delete this form?')) {
         return;
      }

      startTransition(async () => {
         const result = await deleteFormAction(id);

         if (result?.error) {
            showNotification(result.error, 'error');
         } else if (result?.message) {
            showNotification(result.message, 'success');
            router.refresh();
         }
      });
   };

   return (
      <div className='container mx-auto p-4'>
         <div className='mb-4 max-w-70'>
            <Select
               options={['active', 'draft', 'archived']}
               value={statusFilter}
               onChange={setStatusFilter}
               placeholder='Filter by status'
            />
         </div>

         <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
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
                        className='px-6 py-3 cursor-pointer select-none'
                        onClick={handleSort}
                     >
                        Updated At
                        {sortDirection === 'ascending' ? ' ▲' : ' ▼'}
                     </th>
                     {/* <th
                        scope='col'
                        className='px-6 py-3'
                     >
                        Fields Count
                     </th> */}
                     {userRole === 'Admin' && (
                        <th
                           scope='col'
                           className='px-6 py-3'
                        >
                           Actions
                        </th>
                     )}
                  </tr>
               </thead>
               <tbody>
                  {sortedAndFilteredForms.map((form, key) => (
                     <tr
                        key={form.id}
                        className={`bg-white ${
                           key === sortedAndFilteredForms.length - 1 ? '' : 'border-b'
                        }`}
                     >
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                           {form.title}
                        </td>
                        <td className='px-6 py-4'>
                           <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold
                  ${form.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                  ${form.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${form.status === 'archived' ? 'bg-gray-100 text-gray-800' : ''}
                  `}
                           >
                              {form.status}
                           </span>
                        </td>
                        <td className='px-6 py-4'>{new Date(form.updatedAt).toLocaleString()}</td>
                        {/* <td className='px-6 py-4'>{form.fieldsCount}</td> */}
                        {userRole === 'Admin' && (
                           <td className='px-6 py-4 flex space-x-2'>
                              <Link
                                 href={`/forms/${form.id}`}
                                 className='font-medium text-blue-600 hover:underline'
                              >
                                 Edit
                              </Link>
                              <button
                                 onClick={() => handleDelete(form.id)}
                                 className='font-medium text-red-600 hover:underline'
                                 disabled={isDeleting}
                              >
                                 Delete
                              </button>
                           </td>
                        )}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}
