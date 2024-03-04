import type { DefaultSession } from "next-auth";
// eslint-disable-next-line
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
   interface Session extends DefaultSession {
      user: { userId: string };
   }
}

declare module "next-auth/jwt" {
   interface JWT {
      user: { userId: string };
   }
}
