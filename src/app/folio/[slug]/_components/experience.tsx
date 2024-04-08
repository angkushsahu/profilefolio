import type { ExperienceSchemaType } from "~/server/db/getSchema";
import { UnderlinedHeading } from "~/components";
import { cn } from "~/lib";

export interface ExperienceSectionProps {
   experiences: Array<ExperienceSchemaType>;
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
   return (
      <section className="pt-10" id="experience">
         <UnderlinedHeading>Experience</UnderlinedHeading>
         <div className="my-10">
            {experiences.map((experience, idx) => (
               <div key={experience.id} className="my-8 flex gap-x-10 [&>*]:flex-1">
                  <article className="rounded-[0.25rem] border bg-card p-5">
                     <div className="flex flex-col justify-between gap-x-16 gap-y-4 sm:flex-row">
                        <div>
                           <p className="text-4xl font-black text-neutral-300 dark:text-neutral-700">
                              {idx < 10 ? `0${idx + 1}` : idx + 1}
                           </p>
                        </div>
                        <div className="space-y-1.5 sm:text-right">
                           <p className="text-lg font-medium">{experience.jobTitle}</p>
                           <p className="font-medium">{experience.companyName}</p>
                        </div>
                     </div>
                     <div className="mt-4 space-y-1.5">
                        <p className="text-muted-foreground">{experience.employmentType}</p>
                        <p>
                           {experience.startMonth}, {experience.startYear} -{" "}
                           {experience.currentlyWorking ? "Present" : `${experience.endMonth}, ${experience.endYear}`}
                        </p>
                        <p>
                           <span>{experience.locationType}</span>
                           {experience.location ? (
                              <span className="text-muted-foreground">
                                 {" -"} {experience.location}
                              </span>
                           ) : null}
                        </p>
                        {experience.skills ? (
                           <p>
                              <span>Skills: </span>
                              <span className="text-muted-foreground">{experience.skills}</span>
                           </p>
                        ) : null}
                        {experience.industry ? <p className="text-muted-foreground">{experience.industry}</p> : null}
                     </div>
                     {experience.description ? (
                        <div className="mt-4 space-y-1.5">
                           {experience.description.split("\n").map((para, idx) => (
                              <p className="text-muted-foreground" key={`${experience.id}-Experience-para-${idx + 1}`}>
                                 {para}
                              </p>
                           ))}
                        </div>
                     ) : null}
                  </article>
                  <article className={cn("hidden lg:block", { "-order-1": idx % 2 })}></article>
               </div>
            ))}
         </div>
      </section>
   );
}
