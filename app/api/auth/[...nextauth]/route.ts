import { authConfig } from '@/lib/auth';
import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';

const myHandler = NextAuth(authConfig);

export { myHandler as GET, myHandler as POST };
