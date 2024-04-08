"use client";

import { Trash } from "lucide-react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription } from "~/components";
import { AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, toast } from "~/components";
import type { IdValidationType } from "~/validations";
import { api } from "~/trpc/react";

export default function ConfirmDeletion({ id }: IdValidationType) {
   const utils = api.useUtils();
   const { isLoading, mutate } = api.project.deleteProject.useMutation({
      async onSuccess(data) {
         await utils.project.getAllProjects.invalidate();
         toast({ title: data.message });
      },
      onError(error) {
         toast({ title: error.message, variant: "destructive" });
      },
   });

   function removeProject() {
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
               <AlertDialogAction onClick={removeProject} disabled={isLoading}>
                  Delete Project
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
