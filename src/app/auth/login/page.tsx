import type { Metadata } from "next";
import Link from "next/link";

import { registerUrl } from "~/constants";
import LoginForm from "./form";

export const metadata: Metadata = {
   title: "Login",
};

export default function Login() {
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
