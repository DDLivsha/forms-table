import Image from 'next/image';
import Button from '@/components/Button';

export const metadata = {
   title: 'Forms Dashboard – forms management',
   description: 'A convenient tool for creating and controlling forms.',
   keywords: ['forms', 'dashboard', 'management', 'create', 'control'],
   authors: [{ name: 'Donskyi Daniel' }],
   applicationName: 'Forms Dashboard',
   openGraph: {
      title: 'Forms Dashboard',
      description: 'A convenient tool for creating and controlling forms.',
      // url: 'https://your-vercel-deploy-url.vercel.app',
      siteName: 'Forms Dashboard',
      // images: [
      //    {
      //       url: 'https://your-vercel-deploy-url.vercel.app/og-image.png', // Додайте власне OG-зображення
      //       width: 1200,
      //       height: 630,
      //       alt: 'Forms Dashboard Hero Image',
      //    },
      // ],
   },
   locale: 'en_US',
   type: 'website',
   twitter: {
      card: 'summary_large_image',
      title: 'Forms Dashboard',
      description: 'A convenient tool for creating and controlling forms.',
      // images: ['https://your-vercel-deploy-url.vercel.app/twitter-image.png'], // Додайте власне Twitter-зображення
   },
};

export default function HomePage() {
   return (
      <main className='flex min-h-screen flex-col items-center justify-center p-10 bg-gray-50'>
         <div className='relative w-full max-w-2xl text-center'>
            <div className='relative w-full md:h-80 h-50 mb-4 sm:mb-6'>
               <Image
                  src='/hero-image.jpg'
                  alt='Forms Dashboard Hero'
                  fill
                  sizes='100%'
                  style={{ objectFit: 'contain' }}
                  priority
               />
            </div>

            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900'>
               Create and control forms with ease
            </h1>
            <p className='mt-4 sm:mt-6 text-lg leading-8 text-gray-600'>
               A simple and reliable forms control panel. Track, edit and archive your forms.
            </p>
            <div className='mt-4 sm:mt-6 flex items-center justify-center gap-x-6'>
               <Button href='/login'>Get started →</Button>
            </div>
         </div>
      </main>
   );
}
