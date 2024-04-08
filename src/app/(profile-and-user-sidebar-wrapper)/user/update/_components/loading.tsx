import { Skeleton } from "~/components";

export default function Loading() {
   return (
      <section className="space-y-6">
         <div>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="mt-2 h-10 w-full" />
         </div>
         <div>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="mt-2 h-10 w-full" />
         </div>
         <div>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="mt-2 h-10 w-full" />
            <Skeleton className="mt-2 h-5 w-full max-w-xs" />
            <Skeleton className="mt-2 h-5 w-48" />
         </div>
         <Skeleton className="h-10 w-full bg-primary" />
      </section>
   );
}
