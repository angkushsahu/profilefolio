"use client";

import { useState, type PropsWithChildren } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "~/components";
import type { SkillModalProps } from "./types";
import SkillForm from "./form";

export default function SkillModal(props: SkillModalProps & PropsWithChildren) {
   const [open, setOpen] = useState(false);

   return (
      <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{props.children}</DialogTrigger>
         <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
               <h2>{props.title === "Create" ? "Add Skill" : "Update Skill"}</h2>
            </DialogHeader>
            <SkillForm {...props} openModal={setOpen} />
         </DialogContent>
      </Dialog>
   );
}
