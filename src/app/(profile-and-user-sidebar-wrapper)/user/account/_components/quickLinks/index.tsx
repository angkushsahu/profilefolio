import { ShieldAlert, SquareUser } from "lucide-react";
import Link from "next/link";

import { changePasswordUrl, updateAccountUrl } from "~/constants";
import DeleteAccount from "../deleteAccount";
import ViewPortfolio from "./viewPortfolio";
import Logout from "../logout";

const quickLinks = [
   { Icon: SquareUser, title: "Update Account", description: "Update your account details here", href: updateAccountUrl },
   { Icon: ShieldAlert, title: "Change Password", description: "Change your password here", href: changePasswordUrl },
];

export default function QuickLinks() {
   return (
      <section className="mt-16">
         <h2>Quick Links</h2>
         <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {quickLinks.map(({ description, href, Icon, title }) => (
               <Link key={title} href={href} className="block border bg-card px-4 py-5 shadow-sm">
                  <article>
                     <div className="flex items-center gap-x-3">
                        <Icon className="size-7 text-muted-foreground" /> <span className="text-xl font-medium">{title}</span>
                     </div>
                     <p className="ml-10 mt-3 text-muted-foreground">{description}</p>
                  </article>
               </Link>
            ))}
            <ViewPortfolio />
            <Logout />
            <DeleteAccount />
         </div>
      </section>
   );
}
