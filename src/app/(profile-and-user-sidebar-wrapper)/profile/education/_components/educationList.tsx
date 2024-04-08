"use client";

import EducationBox from "./educationBox";
import EducationLoading from "./loading";
import { api } from "~/trpc/react";

export default function EducationList() {
   const { data, isLoading, error, isError } = api.education.getAllEducations.useQuery();
   if (isError) throw new Error(error.message);

   return (
      <section className="mt-8">
         <h1>Education</h1>
         <div className="mt-6 flex flex-wrap gap-6">
            {isLoading ? (
               Array.from({ length: 5 }).map((_, idx) => <EducationLoading key={`Loading-Education-${idx + 1}`} />)
            ) : data.educations.length ? (
               data.educations.map((education) => (
                  <EducationBox
                     key={education.id}
                     {...education}
                     startDate={{ month: education.startMonth, year: education.startYear }}
                     endDate={{ month: education.endMonth, year: education.endYear }}
                  />
               ))
            ) : (
               <p className="text-muted-foreground">You have not added any educational qualification yet</p>
            )}
         </div>
      </section>
   );
}
