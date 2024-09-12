'use client';
import VNGLogo from '@/public/mainLogo.png';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
  Switch,
} from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { redirect, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function CustomNav() {
  const currentPath = usePathname();
  const { theme, setTheme } = useTheme();

  const navObject: { [key: string]: { name: string } } = {
    '/': {
      name: 'Home',
    },
    '/plan': {
      name: 'Create Plan',
    },

    '/saved': {
      name: 'My Saved Plans',
    },
    '/statistics': {
      name: 'Admin',
    },
  };
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'authenticated' && currentPath === '/login') {
      return redirect('/');
    }
    if (status === 'unauthenticated' && currentPath !== '/login') {
      return redirect(`/login?redirect=${currentPath}`);
    }
  }, [status, currentPath]);

  return (
    <Navbar className='w-full border-b border-slate-300 bg-slate-200 shadow-lg dark:border-zinc-700 dark:bg-zinc-800'>
      <NavbarBrand>
        <Image src={VNGLogo} alt='VNG Logo' width={40} height={40} />
        <p className='ml-2 font-bold text-inherit'> MAP-GEN</p>
      </NavbarBrand>

      <NavbarContent className='hidden gap-4 sm:flex' justify='start'>
        {Object.keys(navObject).map((key) => (
          <NavbarItem key={key} isActive={currentPath === key}>
            <Link
              color={currentPath === key ? 'secondary' : 'foreground'}
              href={key}
            >
              {navObject[key].name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as='div' justify='end'>
        <Switch
          defaultSelected
          size='lg'
          color='secondary'
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <Sun className={className} />
            ) : (
              <Moon className={className} />
            )
          }
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        ></Switch>

        {status === 'loading' ? (
          <NavbarItem className=''>
            <Spinner color='primary' size='lg' />
          </NavbarItem>
        ) : status === 'authenticated' ? (
          <Dropdown placement='bottom-end'>
            <DropdownTrigger>
              <Image
                src={session.user?.image as string}
                alt='User Avatar'
                width={40}
                height={40}
                className='rounded-full border-2 border-primary-500 dark:border-primary-400'
              />
            </DropdownTrigger>
            <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile' className='h-14 gap-2'>
                <p className='font-semibold'>Signed in as</p>
                <p className='font-semibold'>{session.user?.email}</p>
              </DropdownItem>
              <DropdownItem
                key='logout'
                color='danger'
                onClick={() => signOut({ callbackUrl: currentPath })}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem className='hidden lg:flex'>
            <Link href={`/login?redirect=${currentPath}`}>Login</Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}
