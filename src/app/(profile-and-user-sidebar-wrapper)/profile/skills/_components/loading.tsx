import { Skeleton } from "~/components";

export default function SkillLoading() {
   return (
      <article className="w-full max-w-md rounded border p-4 shadow-sm sm:p-6">
         <Skeleton className="h-8 w-full" />
         <div className="my-5 flex flex-wrap gap-3">
            {Array.from({ length: 5 }).map((_, idx) => (
               <Skeleton className="h-6 w-20 rounded-full bg-primary" key={`Skill-Pill-${idx + 1}`} />
            ))}
         </div>
         <div className="flex justify-end gap-4">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="size-10 rounded-full" />
         </div>
      </article>
   );
}
