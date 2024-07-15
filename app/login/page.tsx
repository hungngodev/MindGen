import React from 'react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignIn';

function page() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <GoogleSignInButton />
    </div>
  );
}

export default page;
