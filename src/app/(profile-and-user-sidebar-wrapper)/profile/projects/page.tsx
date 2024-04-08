import type { Metadata } from "next";

import ProjectsList from "./_components/projectsList";
import AddProjects from "./_components/addProjects";

export const metadata: Metadata = {
   title: "Projects Profile",
};

export default function Projects() {
   return (
      <section>
         <AddProjects />
         <ProjectsList />
      </section>
   );
}
