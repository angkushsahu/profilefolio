import type { Metadata } from "next";

import ProfileDetails from "./_components/profileDetails";

export const metadata: Metadata = {
   title: "User Profile",
};

export default function ProfileHome() {
   return (
      <section>
         <ProfileDetails />
      </section>
   );
}
