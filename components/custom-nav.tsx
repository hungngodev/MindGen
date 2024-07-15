'use client';
import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Switch,
} from '@nextui-org/react';
import VNGLogo from '@/public/logoVNG.png';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

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
  };

  return (
    <Navbar className='w-full bg-slate-200 shadow-lg dark:bg-zinc-800'>
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
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name='Jason Hughes'
              size='sm'
              src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='team_settings'>Team Settings</DropdownItem>
            <DropdownItem key='analytics'>Analytics</DropdownItem>
            <DropdownItem key='system'>System</DropdownItem>
            <DropdownItem key='configurations'>Configurations</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem>
            <DropdownItem key='logout' color='danger'>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
