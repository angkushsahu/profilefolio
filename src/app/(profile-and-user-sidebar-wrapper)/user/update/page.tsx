import type { Metadata } from "next";

import { getServerAuthSession } from "~/server/auth";
import UserDetails from "./_components/userDetails";

export const metadata: Metadata = {
   title: "Update Account",
};

export default async function UpdateAccount() {
   const session = await getServerAuthSession();

   return (
      <section className="flex min-h-section flex-col items-center justify-center">
         <section className="w-full max-w-lg">
            <h1 className="mb-6">Update Account</h1>
            <UserDetails userId={session?.user.userId} />
         </section>
      </section>
   );
}
