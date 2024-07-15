// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export function NextUIWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute='class' defaultTheme='dark'>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({});

export function QueryClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
