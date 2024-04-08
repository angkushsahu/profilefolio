import { Skeleton } from "~/components";

export default function ProjectLoading() {
   return (
      <article className="w-full max-w-md rounded border p-5">
         <Skeleton className="aspect-[2/1] w-full" />
         <div className="my-6">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="my-2 h-10 w-full" />
            <div className="flex justify-end">
               <Skeleton className="h-10 w-28 bg-primary" />
            </div>
         </div>
         <div className="mt-4 space-y-4">
            <Skeleton className="h-8 w-full" />
            <div className="space-y-1">
               <Skeleton className="h-5 w-full" />
            </div>
            <Skeleton className="h-6 w-1/2" />
            <div className="flex items-center gap-4 py-2">
               <Skeleton className="h-10 w-32 bg-primary" />
               <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-1.5">
               <Skeleton className="h-6 w-28" />
               <Skeleton className="h-5 w-full" />
               <Skeleton className="h-5 w-full" />
               <Skeleton className="h-5 w-full" />
            </div>
         </div>
         <div className="mt-6 flex justify-end gap-4">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="size-10 rounded-full" />
         </div>
      </article>
   );
}
