import type { SkillSchemaType } from "~/server/db/getSchema";
import { Badge, UnderlinedHeading } from "~/components";

export interface SkillsSectionProps {
   skills: Array<SkillSchemaType>;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
   return (
      <section className="pt-10" id="skills">
         <UnderlinedHeading>Skills</UnderlinedHeading>
         <div className="my-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
               <article key={skill.id} className="rounded-[0.25rem] border bg-card p-5">
                  <p className="text-lg font-medium">{skill.title}</p>
                  <div className="mt-4 flex flex-wrap gap-4">
                     {skill.skills?.map((language, idx) => (
                        <Badge
                           key={`${skill.id}-Language-${idx + 1}`}
                           className="border border-secondary bg-secondary text-sm text-black hover:bg-secondary dark:text-white"
                        >
                           {language}
                        </Badge>
                     ))}
                  </div>
               </article>
            ))}
         </div>
      </section>
   );
}
