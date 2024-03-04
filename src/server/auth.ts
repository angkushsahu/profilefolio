import { getServerSession, type DefaultSession, type NextAuthOptions } from "next-auth";

import { env } from "~/env";

declare module "next-auth" {
   interface Session extends DefaultSession {
      user: {
         id: string;
         // ...other properties
         // role: UserRole;
      } & DefaultSession["user"];
   }
}

export const authOptions: NextAuthOptions = {
   callbacks: {
      session: ({ session, token }) => ({
         ...session,
         user: {
            ...session.user,
            id: token.sub,
         },
      }),
   },
   providers: [],
};

export const getServerAuthSession = () => getServerSession(authOptions);
