"use client";

import ExperienceBox from "./experienceBox";
import ExperienceLoading from "./loading";
import { api } from "~/trpc/react";

export default function ExperienceList() {
   const { data, error, isError, isLoading } = api.experience.getAllExperiences.useQuery();
   if (isError) throw new Error(error.message);

   return (
      <section className="mt-8">
         <h1>Experience</h1>
         <div className="mt-6 flex flex-wrap gap-6">
            {isLoading ? (
               Array.from({ length: 5 }).map((_, idx) => <ExperienceLoading key={`Loading-Experience-${idx + 1}`} />)
            ) : data.experiences.length ? (
               data.experiences.map((experience) => (
                  <ExperienceBox
                     key={experience.id}
                     {...experience}
                     startDate={{ month: experience.startMonth, year: experience.startYear }}
                     endDate={{ month: experience.endMonth, year: experience.endYear }}
                  />
               ))
            ) : (
               <p className="text-muted-foreground">You have not added any experience yet</p>
            )}
         </div>
      </section>
   );
}
