"use client";

import { Globe } from "lucide-react";
import Link from "next/link";

import { Skeleton } from "~/components";
import { api } from "~/trpc/react";

export default function ViewPortfolio() {
   const { data, error, isError, isLoading } = api.user.getUser.useQuery();
   if (isError) throw new Error(error.message);

   if (isLoading) return <Skeleton className="h-28 sm:h-full" />;

   return (
      <Link href={`/folio/${data.user.username}`} className="block border bg-card px-4 py-5 shadow-sm">
         <article>
            <div className="flex items-center gap-x-3">
               <Globe className="size-7 text-muted-foreground" /> <span className="text-xl font-medium">View portfolio</span>
            </div>
            <p className="ml-10 mt-3 text-muted-foreground">See your portfolio here</p>
         </article>
      </Link>
   );
}
