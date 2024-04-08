"use client";

import { useState, type PropsWithChildren } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "~/components";
import type { EducationModalProps } from "./types";
import EducationForm from "./form";

export default function EducationModal(props: EducationModalProps & PropsWithChildren) {
   const [open, setOpen] = useState(false);

   return (
      <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>{props.children}</DialogTrigger>
         <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
               <h2>{props.title === "Create" ? "Add Education" : "Update Education"}</h2>
            </DialogHeader>
            <EducationForm {...props} openModal={setOpen} />
         </DialogContent>
      </Dialog>
   );
}
