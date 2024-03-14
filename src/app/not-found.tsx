import { FileX, Home } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "~/components";
import { homeUrl } from "~/constants";

export const metadata: Metadata = {
   title: "Page does not exist",
};

export default function NotFound() {
   return (
      <main className="flex min-h-page flex-col items-center justify-center gap-y-6 p-5">
         <FileX size="200" strokeWidth="0.75" className="text-muted-foreground" />
         <h1 className="text-2xl font-medium">This page does not exist</h1>
         <Link href={homeUrl} replace>
            <Button type="button">
               <Home className="mr-2 h-4 w-4" /> Let{"'"}s get back to Home
            </Button>
         </Link>
      </main>
   );
}
