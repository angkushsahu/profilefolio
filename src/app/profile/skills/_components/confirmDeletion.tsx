"use client";

import { Trash } from "lucide-react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription } from "~/components";
import { AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, toast } from "~/components";
import type { IdValidationType } from "~/validations";
import { api } from "~/trpc/react";

export default function ConfirmDeletion({ id }: IdValidationType) {
   const utils = api.useUtils();
   const { isLoading, mutate } = api.skills.deleteSkill.useMutation({
      onSuccess() {
         let oldElements = utils.skills.getAllSkills.getData();
         oldElements = oldElements?.filter((elem) => elem.id !== id);
         utils.skills.getAllSkills.setData(undefined, () => oldElements);
         toast({ title: "Skill removed successfully" });
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function removeSkillSection() {
      if (isLoading) return;
      mutate({ id });
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button type="button" variant="outline" size="icon" className="rounded-full">
               <Trash className="size-4" />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>Once deleted, it cannot be undone</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={removeSkillSection} disabled={isLoading}>
                  Continue
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
