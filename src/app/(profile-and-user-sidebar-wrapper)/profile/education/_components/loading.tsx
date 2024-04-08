import { Skeleton } from "~/components";

export default function EducationLoading() {
   return (
      <article className="w-full max-w-md space-y-2 rounded border p-5">
         <Skeleton className="h-8 w-full" />
         <Skeleton className="h-6 w-full" />
         <Skeleton className="h-5 w-40" />
         <Skeleton className="h-6 w-20" />
         <div className="flex justify-end gap-4">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="size-10 rounded-full" />
         </div>
      </article>
   );
}
