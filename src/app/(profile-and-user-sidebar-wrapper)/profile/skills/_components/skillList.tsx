"use client";

import SkillLoading from "./loading";
import { api } from "~/trpc/react";
import SkillBox from "./skillBox";

export default function SkillList() {
   const { data, isLoading, error, isError } = api.skills.getAllSkills.useQuery();
   if (isError) throw new Error(error.message);

   return (
      <section className="mt-6">
         <h1>Skills</h1>
         <div className="mt-6 flex flex-wrap gap-5">
            {isLoading ? (
               Array.from({ length: 5 }).map((_, idx) => <SkillLoading key={`Skill-${idx + 1}`} />)
            ) : data.skills.length ? (
               data.skills.map((skill) => <SkillBox key={skill.id} {...skill} />)
            ) : (
               <p className="text-muted-foreground">You have not added any skill yet</p>
            )}
         </div>
      </section>
   );
}
