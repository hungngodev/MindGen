'use client';
import GoogleSignIn from '@/components/auth/GoogleSignIn';

function page() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <GoogleSignIn />
    </div>
  );
}

export default page;
