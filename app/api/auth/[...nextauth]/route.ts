import { authConfig } from '@/lib/auth';
import NextAuth from 'next-auth';
import type { NextApiRequest, NextApiResponse } from 'next';

const myHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, {
    ...authConfig,
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        return true;
      },
      async session({ session, user, token }) {
        return session;
      },
      async jwt({ token, user, account, profile }) {
        return token;
      },
    },
  });
};

export { myHandler as GET, myHandler as POST };
