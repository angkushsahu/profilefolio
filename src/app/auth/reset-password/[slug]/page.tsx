import { RedirectType, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerAuthSession } from "~/server/auth";
import type { ServerPageProps } from "~/types";
import { profileHomeUrl } from "~/constants";
import ResetPasswordForm from "./form";
import { parseSlug } from "~/lib";

export const metadata: Metadata = {
   title: "Reset Password",
};

export default async function ResetPassword({ params, searchParams }: { params: unknown } & ServerPageProps) {
   const session = await getServerAuthSession();

   if (session?.user) {
      if (searchParams.callbackUrl && typeof searchParams.callbackUrl === "string")
         redirect(searchParams.callbackUrl, RedirectType.replace);
      redirect(profileHomeUrl, RedirectType.replace);
   }

   const slug = parseSlug(params);

   return (
      <section className="w-full max-w-xl">
         <h1 className="mb-6">Reset Password</h1>
         <ResetPasswordForm resetId={slug} />
      </section>
   );
}
