"use client";

import { useState, type FormEvent } from "react";

import { Button, Input, Label, toast } from "~/components";
import { uploadProfileImage } from "~/actions/uploadImage";
import type { ProfileImagesProps } from "./types";
import DeleteImage from "./deleteImage";
import { api } from "~/trpc/react";

export default function UploadImages(props: ProfileImagesProps) {
   const [isProfileLoading, setIsProfileLoading] = useState(false);

   const profileImageUploadAction = uploadProfileImage.bind(null, {
      rowId: props.id,
      publicUrl: props.profilePublicUrl,
      secureUrl: props.profileSecureUrl,
   });

   const utils = api.useUtils();

   async function uploadProfile(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (isProfileLoading) return;
      setIsProfileLoading(true);

      try {
         const formData = new FormData(e.currentTarget);
         await profileImageUploadAction(formData);
         await utils.profile.getProfile.invalidate();
         toast({ title: "Profile Image updated successfully" });
      } catch (err: unknown) {
         if (err instanceof Error) throw new Error(err.message);
         throw new Error("Error occurred while updating image");
      } finally {
         setIsProfileLoading(false);
      }
   }

   return (
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
         <form onSubmit={uploadProfile}>
            <Label htmlFor="profile-image" className="text-muted-foreground">
               Choose a Profile Image
            </Label>
            <Input id="profile-image" name="profile-image" type="file" className="mb-2 mt-1 text-muted-foreground" />
            <div className="flex items-center justify-between">
               <DeleteImage id={props.id} publicUrl={props.profilePublicUrl} />
               <Button type="submit" className="text-xs" variant="secondary" disabled={isProfileLoading}>
                  Update Profile Image
               </Button>
            </div>
         </form>
      </div>
   );
}
