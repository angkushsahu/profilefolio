"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";

import { uploadProjectBanner } from "~/actions/uploadImage";
import { Button, Input, Label, toast } from "~/components";
import DeleteImage from "./deleteImage";
import { api } from "~/trpc/react";

export interface ProjectImageProps {
   secureUrl: string | null;
   publicUrl: string | null;
   projectName: string;
   id: string;
}

export default function ProjectImage({ id, projectName, publicUrl, secureUrl }: ProjectImageProps) {
   const [isLoading, setIsLoading] = useState(false);
   const imageUploadAction = uploadProjectBanner.bind(null, { rowId: id, publicUrl, secureUrl });
   const utils = api.useUtils();

   async function uploadImage(e: FormEvent<HTMLFormElement>) {
      e.preventDefault();

      if (isLoading) return;
      setIsLoading(true);

      try {
         const formData = new FormData(e.currentTarget);
         await imageUploadAction(formData);

         await utils.project.getAllProjects.invalidate();
         await utils.project.getProject.invalidate({ id });

         toast({ title: "Project Image updated successfully" });
      } catch (err: unknown) {
         if (err instanceof Error) throw new Error(err.message);
         throw new Error("Error occurred while updating image");
      } finally {
         setIsLoading(false);
      }
   }

   return (
      <section>
         <div className="relative aspect-[2/1] w-full rounded border">
            {secureUrl ? (
               <>
                  <Image src={secureUrl} fill alt={projectName} placeholder="empty" className="z-10 rounded object-contain" />
                  <DeleteImage id={id} publicUrl={publicUrl} />
               </>
            ) : (
               <div className="flex h-full flex-col items-center justify-center rounded border">
                  <span>Choose a picture for your project</span>
                  <span className="text-sm text-muted-foreground">
                     {"("}Please try to maintain a 16:9 resolution{")"}
                  </span>
               </div>
            )}
         </div>
         <form className="my-4" onSubmit={uploadImage}>
            <Label htmlFor="project-banner" className="text-muted-foreground">
               Choose a project image
            </Label>
            <Input id="project-banner" name="project-banner" type="file" className="mb-2 mt-1 text-muted-foreground" />
            <div className="flex justify-end">
               <Button type="submit" className="text-xs" disabled={isLoading}>
                  Update Image
               </Button>
            </div>
         </form>
      </section>
   );
}
