import { Mail } from "lucide-react";
import Link from "next/link";

import { Button, UnderlinedHeading } from "~/components";

export default function ContactSection({ email }: { email: string }) {
   return (
      <section className="flex flex-col items-center justify-center pb-32 pt-10" id="contact">
         <UnderlinedHeading className="mb-10 text-center">Contact Me</UnderlinedHeading>
         <Link href={`mailto:${email}`}>
            <Button type="button">
               <Mail className="mr-3 size-5" />
               <span>Write an email</span>
            </Button>
         </Link>
      </section>
   );
}
