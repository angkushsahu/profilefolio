"use client";

import { Pencil } from "lucide-react";
import { useState } from "react";

import { Button, Dialog, DialogContent, DialogHeader, DialogTrigger } from "~/components";
import type { ProfileType, IdValidationType } from "~/validations";
import ProfileForm from "./form";

export default function DetailsForm(props: ProfileType & IdValidationType) {
   const [open, setOpen] = useState(false);

   return (
      <Dialog defaultOpen={false} open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <div className="flex items-center justify-end">
               <Button>
                  <Pencil className="mr-3 size-4" />
                  Update Profile
               </Button>
            </div>
         </DialogTrigger>
         <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
               <h2>Update Profile</h2>
            </DialogHeader>
            <ProfileForm {...props} openModal={setOpen} />
         </DialogContent>
      </Dialog>
   );
}
