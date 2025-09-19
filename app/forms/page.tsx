'use client';
import React from 'react';
import { useAuthStore } from '@/lib/store';

export default function FormsPage() {
   const { role } = useAuthStore();

   return (
      <div>
         <h1>Forms</h1>
         <p>Role: {role}</p>
      </div>
   );
}
