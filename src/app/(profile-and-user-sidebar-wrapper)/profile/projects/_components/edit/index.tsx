"use client";

import { useState, type PropsWithChildren } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "~/components";
import type { ProjectModalProps } from "./types";
import ProjectForm from "./form";

export default function ProjectModal(props: ProjectModalProps & PropsWithChildren) {
   const [open, setOpen] = useState(false);

   return (
      <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{props.children}</DialogTrigger>
         <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
               <h2>{props.title === "Create" ? "Add Project" : "Update Project"}</h2>
            </DialogHeader>
            <ProjectForm {...props} openModal={setOpen} />
         </DialogContent>
      </Dialog>
   );
}
