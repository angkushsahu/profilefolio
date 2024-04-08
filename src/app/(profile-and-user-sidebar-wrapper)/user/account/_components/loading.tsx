import { Skeleton } from "~/components";

export default function Loading() {
   return (
      <section>
         <div className="flex items-center justify-between">
            <Skeleton className="size-40 rounded-full md:size-60" />
            <div className="flex w-full max-w-sm flex-col gap-y-2">
               <Skeleton className="h-12 w-full max-w-lg" />
               <Skeleton className="h-6 w-full max-w-sm" />
               <Skeleton className="h-5 w-full max-w-md" />
               <Skeleton className="h-5 w-full max-w-sm" />
            </div>
         </div>
      </section>
   );
}
