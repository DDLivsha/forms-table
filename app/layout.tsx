import type { Metadata } from 'next';
import './globals.css';
import Toast from '@/components/Toast';

export const metadata: Metadata = {
   title: 'Forms Dashboard',
   description: 'A convenient tool for creating and controlling forms.',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='en'>
         <body>
            {children}
            <Toast />
         </body>
      </html>
   );
}
