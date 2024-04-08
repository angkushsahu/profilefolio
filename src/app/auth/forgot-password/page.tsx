import type { Metadata } from "next";

import ForgotPasswordForm from "./form";

export const metadata: Metadata = {
   title: "Forgot Password",
};

export default function ForgotPassword() {
   return (
      <section className="w-full max-w-xl">
         <h1 className="mb-6">Forgot Password</h1>
         <ForgotPasswordForm />
      </section>
   );
}
