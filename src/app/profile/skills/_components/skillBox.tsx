"use client";

import { Pencil, X } from "lucide-react";
import { useState } from "react";

import { Badge, Button, Input, toast } from "~/components";
import ConfirmDeletion from "./confirmDeletion";
import type { SkillType } from "~/validations";
import { api } from "~/trpc/react";

export type SkillBoxProps = SkillType;

export default function SkillBox(skill: SkillBoxProps) {
   const [edit, setEdit] = useState(false);
   const [title, setTitle] = useState(skill.title);
   const [skills, setSkills] = useState(skill.skills);
   const utils = api.useUtils();

   const { isLoading, mutate } = api.skills.updateSkill.useMutation({
      onSuccess(data) {
         const oldElements = utils.skills.getAllSkills.getData();
         if (!oldElements) return;
         for (const elem of oldElements) {
            if (elem.id === data.id) {
               elem.skills = data.skills;
               elem.title = data.title;
            }
         }
         utils.skills.getAllSkills.setData(undefined, () => oldElements);

         utils.skills.getSkill.setData({ id: data.id }, () => data);

         toast({ title: "Skill updated successfully" });
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function onUpdateSkillSection() {
      if (isLoading) return;
      mutate({ id: skill.id, skills, title });
      setEdit(false);
   }

   function removeSkill(currentSkill: string) {
      setSkills((prev) => prev.filter((skill) => currentSkill !== skill));
   }

   return (
      <article className="w-full max-w-md rounded border p-4 shadow-sm sm:p-6">
         {edit ? (
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Frontend skills" />
         ) : (
            <h3>{skill.title}</h3>
         )}
         <div className="my-5 flex flex-wrap gap-3">
            {skills.map((skill) => (
               // TODO: Add badge deleting functionality
               <Badge key={skill} className="text-sm font-medium hover:bg-primary">
                  {skill} {edit ? <X className="ml-2 size-3.5 cursor-pointer" onClick={() => removeSkill(skill)} /> : null}
               </Badge>
            ))}
         </div>
         <div className="flex justify-end gap-4">
            {edit ? (
               <Button type="button" onClick={onUpdateSkillSection} disabled={isLoading}>
                  Update
               </Button>
            ) : (
               <>
                  <Button type="button" variant="outline" size="icon" className="rounded-full" onClick={() => setEdit(true)}>
                     <Pencil className="size-4" />
                  </Button>
                  <ConfirmDeletion id={skill.id} />
               </>
            )}
         </div>
      </article>
   );
}
