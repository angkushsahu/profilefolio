import { Skeleton } from "~/components";

export default function ExperienceLoading() {
   return (
      <article className="w-full max-w-md space-y-2 rounded border p-5">
         <Skeleton className="h-8 w-full" />
         <Skeleton className="h-6 w-full" />
         <Skeleton className="h-6 w-1/2" />
         <Skeleton className="h-5 w-1/4" />
         <Skeleton className="h-5 w-1/4" />
         <Skeleton className="h-6 w-full" />
         <Skeleton className="h-6 w-full" />
         <div className="space-y-1">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
         </div>
         <div className="flex justify-end gap-4">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="size-10 rounded-full" />
         </div>
      </article>
   );
}
