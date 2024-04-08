"use client";

import { useState, type PropsWithChildren } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "~/components";
import type { ExperienceModalProps } from "./types";
import ExperienceForm from "./form";

export default function ExperienceModal(props: ExperienceModalProps & PropsWithChildren) {
   const [open, setOpen] = useState(false);

   return (
      <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{props.children}</DialogTrigger>
         <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
               <h2>{props.title === "Create" ? "Add Experience" : "Update Experience"}</h2>
            </DialogHeader>
            <ExperienceForm {...props} openModal={setOpen} />
         </DialogContent>
      </Dialog>
   );
}
