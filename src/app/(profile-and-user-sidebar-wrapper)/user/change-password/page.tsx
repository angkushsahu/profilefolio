import type { Metadata } from "next";

import ChangePasswordForm from "./form";

export const metadata: Metadata = {
   title: "Change Password",
};

export default function ChangePassword() {
   return (
      <section className="flex min-h-section flex-col items-center justify-center">
         <section className="w-full max-w-lg">
            <h1 className="mb-6">Change Password</h1>
            <ChangePasswordForm />
         </section>
      </section>
   );
}
