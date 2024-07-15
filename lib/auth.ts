import GoogleProvider from 'next-auth/providers/google';

export const authConfig = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_AUTH_SECRET,
};
