import { Skeleton } from "~/components";

export function ProfileDetailsLoading() {
   return (
      <section>
         <div className="mb-4 flex flex-wrap items-center justify-center gap-6">
            <Skeleton className="size-40 rounded-full md:size-60" />
            <div className="my-6 sm:min-w-80">
               <Skeleton className="h-5 w-40" />
               <Skeleton className="my-2 h-10 w-full" />
               <div className="flex justify-end">
                  <Skeleton className="h-10 w-28" />
               </div>
            </div>
         </div>
         <section className="mb-8 mt-12">
            <div className="space-y-4">
               {Array.from({ length: 5 }).map((_, idx) => (
                  <div key={`Profile-details-loading-${idx + 1}`}>
                     <Skeleton className="mb-2 h-7 w-40" />
                     <Skeleton className="h-6 w-full sm:w-4/5" />
                  </div>
               ))}
            </div>
         </section>
         <div className="flex items-center justify-end">
            <Skeleton className="h-10 w-40 bg-primary" />
         </div>
      </section>
   );
}
