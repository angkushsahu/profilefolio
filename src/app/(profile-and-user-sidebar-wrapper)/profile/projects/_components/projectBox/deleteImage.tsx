"use client";

import { Trash } from "lucide-react";
import { useState } from "react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription } from "~/components";
import { AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, toast } from "~/components";
import { removeProjectImage } from "~/actions/removeImage";
import type { IdValidationType } from "~/validations";
import { api } from "~/trpc/react";

export type DeleteImageProps = IdValidationType & { publicUrl: string | null };

export default function DeleteImage({ id, publicUrl }: DeleteImageProps) {
   const [isLoading, setIsLoading] = useState(false);
   const removeImageAction = removeProjectImage.bind(null, { rowId: id, publicUrl });
   const utils = api.useUtils();

   async function deleteProjectImage() {
      if (isLoading) return;
      setIsLoading(true);

      try {
         await removeImageAction();

         await utils.project.getAllProjects.invalidate();
         await utils.project.getProject.invalidate({ id });

         toast({ title: "Project Image deleted successfully" });
      } catch (err: unknown) {
         if (err instanceof Error) throw new Error(err.message);
         throw new Error("Error occurred while updating image");
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button
               type="button"
               variant="outline"
               size="icon"
               className="absolute bottom-2 right-2 z-20 rounded-full"
               disabled={isLoading}
            >
               <Trash className="size-4" />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Delete Project Image?</AlertDialogTitle>
               <AlertDialogDescription>Once deleted, it cannot be undone</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={deleteProjectImage} disabled={isLoading}>
                  Delete Image
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
