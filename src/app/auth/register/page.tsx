import { RedirectType, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { loginUrl, profileHomeUrl } from "~/constants";
import { getServerAuthSession } from "~/server/auth";
import type { ServerPageProps } from "~/types";
import RegisterForm from "./form";

export const metadata: Metadata = {
   title: "Register Account",
};

export default async function Register({ searchParams }: ServerPageProps) {
   const session = await getServerAuthSession();

   if (session?.user) {
      if (searchParams.callbackUrl && typeof searchParams.callbackUrl === "string")
         redirect(searchParams.callbackUrl, RedirectType.replace);
      redirect(profileHomeUrl, RedirectType.replace);
   }

   return (
      <section className="w-full max-w-xl">
         <h1 className="mb-6">Register</h1>
         <RegisterForm />
         <div className="mt-4 text-center text-sm text-muted-foreground">
            <Link href={loginUrl}>Login instead ?</Link>
         </div>
      </section>
   );
}
