import { getServerSession, type Awaitable, type NextAuthOptions, type User } from "next-auth";
import CredentialsProvider, { type CredentialInput } from "next-auth/providers/credentials";

import { loginUrl } from "~/constants";
import { env } from "~/env";

export const authOptions: NextAuthOptions = {
   pages: {
      signIn: loginUrl,
   },
   session: {
      strategy: "jwt",
      maxAge: Number(env.COOKIEAGE),
   },
   secret: env.JWT_SECRET,
   debug: process.env.NODE_ENV === "development",
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {} as Record<string, CredentialInput>,
         async authorize(credentials) {
            if (!credentials) throw new Error("Invalid credentials");
            return { userId: credentials.userId } as unknown as Awaitable<User>;
         },
      }),
   ],
   callbacks: {
      jwt({ token, user }) {
         if (user) {
            const { userId } = user as unknown as { userId: string };
            token = { ...token, user: { userId } };
         }
         return token;
      },
      session({ session, token }) {
         session.user = token.user;
         return session;
      },
      redirect({ url }) {
         return url;
      },
   },
};

export const getServerAuthSession = () => getServerSession(authOptions);
