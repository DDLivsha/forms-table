import { cookies } from 'next/headers';
import EditForm from './EditForm';
import { IForm } from '@/interfaces/form';

async function getForm(id: string): Promise<IForm> {
   const res = await fetch(`http://localhost:3000/api/forms/${id}`);

   if (!res.ok) {
      throw new Error('Failed to fetch form data');
   }

   return res.json();
}

export default async function EditFormPage({ params }: { params: { id: string } }) {
   const { id } = params;
   const form = await getForm(id);
   const cookiesStore = await cookies();

   const role = cookiesStore.get('role')?.value as 'Admin' | 'Individual';

   if (role !== 'Admin') {
      return (
         <div className='flex justify-center items-center h-screen text-2xl text-red-600'>
            You do not have permission to edit this form.
         </div>
      );
   }

   return <EditForm initialForm={form} />;
}
