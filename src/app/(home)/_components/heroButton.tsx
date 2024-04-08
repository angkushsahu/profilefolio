import Link from "next/link";

import { loginUrl, profileHomeUrl } from "~/constants";
import { getServerAuthSession } from "~/server/auth";
import { Button } from "~/components";

export default async function HeroButton() {
   const session = await getServerAuthSession();

   return (
      <Link href={session?.user ? profileHomeUrl : loginUrl}>
         <Button type="button">{session?.user ? "Go to Profile Page" : "Login"}</Button>
      </Link>
   );
}
