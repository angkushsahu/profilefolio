import type { Metadata } from "next";

import SkillList from "./_components/skillList";
import AddSkill from "./_components/addSkill";

export const metadata: Metadata = {
   title: "Skills Profile",
};

export default function Skills() {
   return (
      <section>
         <AddSkill />
         <SkillList />
      </section>
   );
}
