import { cookies } from 'next/headers';
import FormsTable from './FormsTable';
import HeaderButtons from './HeaderButtons';

async function getForms() {
   const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/forms`);
   if (!res.ok) {
      throw new Error('Failed to fetch forms data');
   }
   return res.json();
}

export default async function FormsPage() {
   const cookiesStore = await cookies();

   const forms = await getForms();
   const role = cookiesStore.get('role')?.value as 'Admin' | 'Individual';

   return (
      <div className='container mx-auto p-4'>
         <div className='flex items-center gap-4 justify-between'>
            <h1 className='text-3xl font-bold'>Forms Dashboard</h1>
            <HeaderButtons userRole={role} />
         </div>
         <FormsTable
            initialForms={forms}
            userRole={role}
         />
      </div>
   );
}
