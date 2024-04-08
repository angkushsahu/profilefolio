import type { Metadata } from "next";

import EducationList from "./_components/educationList";
import AddEducation from "./_components/addEducation";

export const metadata: Metadata = {
   title: "Education Profile",
};

export default function Education() {
   return (
      <section>
         <AddEducation />
         <EducationList />
      </section>
   );
}
