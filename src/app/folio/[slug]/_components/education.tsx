import type { EducationSchemaType } from "~/server/db/getSchema";
import { UnderlinedHeading } from "~/components";

export interface EducationSectionProps {
   educations: Array<EducationSchemaType>;
}

export default function EducationSection({ educations }: EducationSectionProps) {
   return (
      <section className="pt-10" id="education">
         <UnderlinedHeading>Education</UnderlinedHeading>
         <div className="my-10 grid gap-8 md:grid-cols-2">
            {educations.map((education) => (
               <article key={education.id} className="space-y-1.5 rounded-[0.25rem] border bg-card p-5">
                  {education.degree ? <p className="text-lg font-medium">{education.degree}</p> : null}
                  <p className="font-medium text-muted-foreground">{education.institute}</p>
                  {education.fieldOfStudy ? <p className="text-muted-foreground">{education.fieldOfStudy}</p> : null}
                  <p>
                     {education.startMonth}, {education.startYear} -{" "}
                     {education.currentlyWorking ? "Present" : `${education.endMonth}, ${education.endYear}`}
                  </p>
                  {education.grade ? (
                     <p>
                        <span>Grade: </span>
                        <span className="text-muted-foreground">{education.grade}</span>
                     </p>
                  ) : null}
                  {education.activities ? (
                     <p>
                        <span>Activites and societies: </span>
                        <span className="text-muted-foreground">{education.activities}</span>
                     </p>
                  ) : null}
               </article>
            ))}
         </div>
      </section>
   );
}
