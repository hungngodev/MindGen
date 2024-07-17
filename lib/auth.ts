import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import type { Adapter } from 'next-auth/adapters';

const prisma = new PrismaClient();

export const authConfig = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      profile(profile, token) {
        console.log(profile);
        return {
          id: profile.sub,
          ...profile,
        };
      },
    }),
    // ...add more providers here
  ],
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma) as Adapter,
  secret: process.env.NEXT_AUTH_SECRET,
};
