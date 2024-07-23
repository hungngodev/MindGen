'use client';
import GoogleSignIn from '@/components/auth/GoogleSignIn';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function page() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  return (
    <Suspense>
      <div className='flex h-[90vh] w-full items-center justify-center'>
        <GoogleSignIn redirect={redirect} />
      </div>
    </Suspense>
  );
}

export default page;
