import type { Metadata } from "next";
import Link from "next/link";

import { loginUrl } from "~/constants";
import RegisterForm from "./form";

export const metadata: Metadata = {
   title: "Register Account",
};

export default function Register() {
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
