"use client";

import { Plus } from "lucide-react";

import { Button } from "~/components";
import SkillModal from "./edit";

export default function AddSkill() {
   return (
      <div className="flex justify-end">
         <SkillModal title="Create" values={{ skills: [], title: "" }}>
            <Button>
               <Plus className="mr-2 size-5" />
               Add Skill
            </Button>
         </SkillModal>
      </div>
   );
}
