import type { Metadata } from "next";

import ExperienceList from "./_components/experienceList";
import AddExperience from "./_components/addExperience";

export const metadata: Metadata = {
   title: "Experience Profile",
};

export default function Experience() {
   return (
      <section>
         <AddExperience />
         <ExperienceList />
      </section>
   );
}
