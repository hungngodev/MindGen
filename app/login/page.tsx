import GoogleSignIn from '@/components/auth/GoogleSignIn';

function page() {
  return (
    <div className='flex h-[90vh] w-full items-center justify-center'>
      <GoogleSignIn />
    </div>
  );
}

export default page;
