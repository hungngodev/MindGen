import { Inter } from 'next/font/google';
import { NextUIWrapper, QueryClientWrapper } from './providers';
import CustomNav from '@/components/custom-nav';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VNG Map-Gen',
  description: 'An app to generate mind maps using AI Tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextUIWrapper>
          <QueryClientWrapper>
            <CustomNav />
            {children}
          </QueryClientWrapper>
        </NextUIWrapper>
      </body>
    </html>
  );
}
