'use client';
import GoogleSignIn from '@/components/auth/GoogleSignIn';
import { Suspense } from 'react';

function page() {
  return (
    <Suspense>
      <div className='flex h-[90vh] w-full items-center justify-center'>
        <GoogleSignIn />
      </div>
    </Suspense>
  );
}

export default page;
