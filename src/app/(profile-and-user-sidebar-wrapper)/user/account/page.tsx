import type { Metadata } from "next";

import QuickLinks from "./_components/quickLinks";
import UserProfile from "./_components/profile";

export const metadata: Metadata = {
   title: "User Account",
};

export default function Account() {
   return (
      <section>
         <UserProfile />
         <QuickLinks />
      </section>
   );
}
