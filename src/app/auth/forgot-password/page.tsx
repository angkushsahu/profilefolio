import { RedirectType, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerAuthSession } from "~/server/auth";
import type { ServerPageProps } from "~/types";
import { profileHomeUrl } from "~/constants";
import ForgotPasswordForm from "./form";

export const metadata: Metadata = {
   title: "Forgot Password",
};

export default async function ForgotPassword({ searchParams }: ServerPageProps) {
   const session = await getServerAuthSession();

   if (session?.user) {
      if (searchParams.callbackUrl && typeof searchParams.callbackUrl === "string")
         redirect(searchParams.callbackUrl, RedirectType.replace);
      redirect(profileHomeUrl, RedirectType.replace);
   }

   return (
      <section className="w-full max-w-xl">
         <h1 className="mb-6">Forgot Password</h1>
         <ForgotPasswordForm />
      </section>
   );
}
