'use client';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginSchemaType } from '@/lib/schemas';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Button from '@/components/Button';

export default function LoginPage() {
   const {
      control,
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginSchemaType>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         role: 'Individual',
      },
   });

   const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
      console.log('Form data:', data);
      // Тут буде логіка збереження кукі
   };

   return (
      <main className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
         <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
            <h1 className='mb-6 text-center text-3xl font-bold'>Log in</h1>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className='space-y-6'
            >
               <Input
                  {...register('email')}
                  label='Email'
                  placeholder='Enter your email'
                  type='email'
                  error={errors.email}
               />
               <Controller
                  name='role'
                  control={control}
                  render={({ field: { value, onChange } }) => (
                     <>
                        <Select
                           value={value}
                           onChange={onChange}
                           options={['Individual', 'Admin']}
                           error={errors.role}
                           placeholder='Select your role'
                           label='Role'
                        />
                     </>
                  )}
               />
               <Button
                  type='submit'
                  className='w-full'
               >
                  Login →
               </Button>
            </form>
         </div>
      </main>
   );
}
