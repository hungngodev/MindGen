import googleLogo from '@/public/google.png';
import { Button } from '@nextui-org/button';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Suspense } from 'react';

function GoogleSignIn({ redirect }: { redirect: string | null }) {
  function handleClick() {
    signIn('google', {
      callbackUrl: redirect || '/',
    });
  }
  return (
    <Suspense>
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
    </Suspense>
  );
}

export default GoogleSignIn;
