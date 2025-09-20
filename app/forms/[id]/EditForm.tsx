'use client';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchemaType, formSchema } from '@/lib/schemas';
import { updateFormAction } from '@/lib/actions';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useNotificationStore } from '@/lib/store/notificationStore';

interface EditFormProps {
   initialForm: FormSchemaType;
}

export default function EditFormPage({ initialForm }: EditFormProps) {
   const router = useRouter();
   const { showNotification } = useNotificationStore();

   const {
      control,
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      setError,
   } = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: initialForm,
   });

   const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
      const res = await updateFormAction(data);

      if (res?.errors) {
         const errors = res.errors as { [key: string]: string[] | undefined };

         Object.keys(errors).forEach((key) => {
            setError(key as keyof FormSchemaType, {
               type: 'server',
               message: errors[key]?.[0] || '',
            });
         });
      } else if (res?.error) {
         showNotification(res.error, 'error');
      } else if (res?.message) {
         showNotification(res.message, 'success');
         router.push('/forms');
      }
   };

   return (
      <main className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
         <Button
            className='absolute top-4 left-4'
            href='/forms'
         >
            Back to dashboard
         </Button>
         <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
            <h1 className='mb-6 text-center text-3xl font-bold'>Update Form</h1>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className='space-y-4'
            >
               <Input
                  label='Title'
                  type='text'
                  error={errors.title}
                  {...register('title')}
               />
               <Input
                  label='Description (optional)'
                  type='text'
                  error={errors.description}
                  {...register('description')}
               />
               <Input
                  label='Fields Count'
                  type='number'
                  error={errors.fieldsCount}
                  {...register('fieldsCount', { valueAsNumber: true })}
               />
               <Controller
                  name='status'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                     <>
                        <Select
                           value={value}
                           onChange={onChange}
                           options={['draft', 'active', 'archived']}
                           error={errors.status}
                           placeholder='Select status'
                           label='Role'
                        />
                     </>
                  )}
               />
               <Button
                  type='submit'
                  className='w-full mt-3'
               >
                  {isSubmitting ? 'Updating...' : 'Update Form →'}
               </Button>
            </form>
         </div>
      </main>
   );
}
