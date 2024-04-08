"use client";

import { useState, type Dispatch, type SetStateAction, type FormEvent } from "react";
import { X } from "lucide-react";

import { Badge, Button, Input, Label, toast } from "~/components";
import type { SkillModalProps } from "./types";
import { api } from "~/trpc/react";

export type SkillFormProps = SkillModalProps & { openModal: Dispatch<SetStateAction<boolean>> };

export default function SkillForm(props: SkillFormProps) {
   const utils = api.useUtils();
   const [title, setTitle] = useState(props.values.title);
   const [skills, setSkills] = useState<Set<string>>(new Set(props.values.skills));

   const { mutate: createMutation, isLoading: creationLoading } = api.skills.createSkill.useMutation({
      async onSuccess(data) {
         await utils.skills.getAllSkills.invalidate();
         toast({ title: data.message });
         setTitle("");
         setSkills(new Set());
         props.openModal(false);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   const { isLoading: updationLoading, mutate: updateMutation } = api.skills.updateSkill.useMutation({
      async onSuccess(data) {
         await utils.skills.getAllSkills.invalidate();
         if (props.title === "Update") await utils.skills.getSkill.invalidate({ id: props.values.id });
         toast({ title: data.message });
         props.openModal(false);
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function createSkill() {
      if (props.title === "Create") {
         if (creationLoading) return;
         createMutation({ skills: [...skills], title });
      } else {
         if (updationLoading) return;
         updateMutation({ id: props.values.id, skills: [...skills], title });
      }
   }

   function addToSkillArray(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      const form = new FormData(e.currentTarget);
      const skill = form.get("skills") as string;

      if (!skill.trim()) return;
      e.currentTarget.reset();
      setSkills((prev) => new Set([skill, ...prev]));
   }

   function deleteFromSkillArray(skill: string) {
      setSkills((prev) => {
         const newSet = new Set(prev);
         newSet.delete(skill);
         return newSet;
      });
   }

   return (
      <section>
         <div>
            <div>
               <Label htmlFor="skill-section-title">Skill Section Title</Label>
               <Input
                  id="skill-section-title"
                  name="skill-section-title"
                  placeholder="e.g. Frontend skills"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1"
               />
            </div>
            <form onSubmit={addToSkillArray} className="mt-4">
               <Label htmlFor="skills">Add Skills</Label>
               <Input id="skills" name="skills" placeholder="e.g. React, Next" className="mt-1" />
               <p className="mt-2 text-sm text-muted-foreground">
                  Hit{" "}
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                     <span className="text-xs">Enter</span>
                  </kbd>{" "}
                  to add skill
               </p>
            </form>
            {/* Display skills -- start */}
            <div className="my-5 flex flex-wrap gap-4">
               {[...skills].map((skill) => (
                  <Badge key={skill} className="text-sm font-medium hover:bg-primary">
                     {skill} <X className="ml-2 size-3.5 cursor-pointer" onClick={() => deleteFromSkillArray(skill)} />
                  </Badge>
               ))}
            </div>
            {/* Display skills -- end */}
            <Button
               type="button"
               disabled={!skills.size || !title.trim().length || creationLoading || updationLoading}
               className="ml-auto mt-6 block"
               onClick={createSkill}
            >
               {props.title === "Create" ? "Add" : "Update"} Skills
            </Button>
         </div>
      </section>
   );
}
