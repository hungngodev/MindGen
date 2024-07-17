'use client';
import googleLogo from '@/public/google.png';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Button } from '@nextui-org/button';

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
    <Button
      color='primary'
      onClick={handleClick}
      variant='ghost'
      startContent={
        <Image src={googleLogo} alt='Google Logo' width={20} height={20} />
      }
    >
      Continue with Google
    </Button>
  );
}

export default GoogleSignIn;
