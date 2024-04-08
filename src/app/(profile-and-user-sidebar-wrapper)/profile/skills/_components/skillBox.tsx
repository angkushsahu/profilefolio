"use client";

import { Pencil } from "lucide-react";

import ConfirmDeletion from "./confirmDeletion";
import type { SkillType } from "~/validations";
import { Badge, Button } from "~/components";
import SkillModal from "./edit";

export type SkillBoxProps = SkillType;

export default function SkillBox(skill: SkillBoxProps) {
   return (
      <article className="w-full max-w-md rounded border p-4 shadow-sm sm:p-6">
         <h3>{skill.title}</h3>
         <div className="my-5 flex flex-wrap gap-3">
            {skill.skills?.map((skill) => (
               <Badge key={skill} className="text-sm font-medium hover:bg-primary">
                  {skill}
               </Badge>
            ))}
         </div>
         <div className="flex justify-end gap-4">
            <SkillModal title="Update" values={skill}>
               <Button type="button" variant="outline" size="icon" className="rounded-full">
                  <Pencil className="size-4" />
               </Button>
            </SkillModal>
            <ConfirmDeletion id={skill.id} />
         </div>
      </article>
   );
}
