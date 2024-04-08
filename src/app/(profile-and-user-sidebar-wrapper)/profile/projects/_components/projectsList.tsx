"use client";

import ProjectLoading from "./loading";
import ProjectBox from "./projectBox";
import { api } from "~/trpc/react";

export default function ProjectsList() {
   const { data, error, isError, isLoading } = api.project.getAllProjects.useQuery();
   if (isError) throw new Error(error.message);

   return (
      <section className="mt-8">
         <h1>Projects</h1>
         <div className="mt-6 flex flex-wrap gap-6">
            {isLoading ? (
               Array.from({ length: 5 }).map((_, idx) => <ProjectLoading key={`Loading-Project-${idx + 1}`} />)
            ) : data.projects.length ? (
               data.projects.map((project) => (
                  <ProjectBox
                     key={project.id}
                     {...project}
                     startDate={{ month: project.startMonth, year: project.startYear }}
                     endDate={{ month: project.endMonth, year: project.endYear }}
                  />
               ))
            ) : (
               <p className="text-muted-foreground">You have not added any projects yet</p>
            )}
         </div>
      </section>
   );
}
