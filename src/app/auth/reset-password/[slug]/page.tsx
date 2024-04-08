import type { Metadata } from "next";

import ResetPasswordForm from "./form";
import { parseSlug } from "~/lib";

export const metadata: Metadata = {
   title: "Reset Password",
};

export default function ResetPassword({ params }: { params: unknown }) {
   const slug = parseSlug(params);

   return (
      <section className="w-full max-w-xl">
         <h1 className="mb-6">Reset Password</h1>
         <ResetPasswordForm resetId={slug} />
      </section>
   );
}
