import { RedirectType, redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

import { profileHomeUrl, registerUrl } from "~/constants";
import { getServerAuthSession } from "~/server/auth";
import type { ServerPageProps } from "~/types";
import LoginForm from "./form";

export const metadata: Metadata = {
   title: "Login",
};

export default async function Login({ searchParams }: ServerPageProps) {
   const session = await getServerAuthSession();

   if (session?.user) {
      if (searchParams.callbackUrl && typeof searchParams.callbackUrl === "string")
         redirect(searchParams.callbackUrl, RedirectType.replace);
      redirect(profileHomeUrl, RedirectType.replace);
   }

   return (
      <section className="w-full max-w-xl">
         <h1 className="mb-6">Login</h1>
         <LoginForm />
         <div className="mt-4 text-center text-sm text-muted-foreground">
            <Link href={registerUrl}>Register instead ?</Link>
         </div>
      </section>
   );
}
