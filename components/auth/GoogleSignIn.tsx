'use client';
import googleLogo from '@/public/google.png';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

function GoogleSignIn() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  console.log(redirect);

  function handleClick() {
    signIn('google', {
      callbackUrl: redirect || '/',
    });
  }
  return (
    <button
      onClick={handleClick}
      className='focus:shadow-outline mt-4 flex h-14 w-full items-center justify-center rounded-lg border-2 border-black bg-white px-6 text-xl font-semibold text-black transition-colors duration-300 hover:bg-slate-200'
    >
      <Image src={googleLogo} alt='Google Logo' width={20} height={20} />
      <span className='ml-4'>Continue with Google</span>
    </button>
  );
}

export default GoogleSignIn;
