"use client";

import { Trash } from "lucide-react";
import { useState } from "react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription } from "~/components";
import { AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, toast } from "~/components";
import { removeProfileImage } from "~/actions/removeImage";
import type { IdValidationType } from "~/validations";
import { api } from "~/trpc/react";

export type DeleteImageProps = IdValidationType & { publicUrl: string | null };

export default function DeleteImage({ id, publicUrl }: DeleteImageProps) {
   const [isLoading, setIsLoading] = useState(false);
   const utils = api.useUtils();

   const deleteProfilePicture = removeProfileImage.bind(null, { rowId: id, publicUrl });

   async function deleteProfileImages() {
      if (isLoading) return;
      setIsLoading(true);

      try {
         await deleteProfilePicture();
         await utils.profile.getProfile.invalidate();
         toast({ title: "Profile updated successfully" });
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
            <Button type="button" variant="outline" size="icon" className="rounded-full border-destructive" disabled={isLoading}>
               <Trash className="size-4 text-destructive" />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Delete Profile Picture?</AlertDialogTitle>
               <AlertDialogDescription>Once deleted, it cannot be undone</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={deleteProfileImages} disabled={isLoading}>
                  Delete Image
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
