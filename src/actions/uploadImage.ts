"use server";

import type { UploadApiResponse } from "cloudinary";
import { and, eq } from "drizzle-orm";

import { profile as profiles, projects } from "~/server/db/getSchema";
import { getServerAuthSession } from "~/server/auth";
import type { UploadImageArgs } from "./types";
import cloudinary from "~/lib/cloudinary";
import { db } from "~/server/db";

export async function uploadImage(args: UploadImageArgs, formData: FormData, directory: string, formElement: string) {
   try {
      const { publicUrl, secureUrl } = args;

      const imageFile = formData.get(formElement) as File;
      if (!imageFile?.size) return;

      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      if (publicUrl && secureUrl) await cloudinary.uploader.destroy(publicUrl); // remove image if already exists

      const response: UploadApiResponse | undefined = await new Promise(function (resolve, reject) {
         cloudinary.uploader
            .upload_stream(
               {
                  folder: `profilefolio/${directory}`,
                  use_filename: true,
               },
               function (error, result) {
                  if (error) {
                     reject(error);
                     return;
                  }

                  resolve(result);
               }
            )
            .end(buffer);
      });

      return response;
   } catch (err: unknown) {
      if (err instanceof Error) throw new Error(err.message);
      throw new Error("Error occurred while updating image");
   }
}

export async function uploadProjectBanner(args: UploadImageArgs, formData: FormData) {
   try {
      const session = await getServerAuthSession();
      if (!session) return;

      const response = await uploadImage(args, formData, "projects", "project-banner");
      if (!response) throw new Error("Error occurred while saving the file");

      await db
         .update(projects)
         .set({ publicUrl: response.public_id, secureUrl: response.secure_url })
         .where(and(eq(projects.id, args.rowId), eq(projects.userId, session.user.userId)));
   } catch (err: unknown) {
      if (err instanceof Error) throw new Error(err.message);
      throw new Error("Error occurred while updating image");
   }
}

export async function uploadProfileImage(args: UploadImageArgs, formData: FormData) {
   try {
      const session = await getServerAuthSession();
      if (!session) return;

      const response = await uploadImage(args, formData, "profiles", "profile-image");
      if (!response) throw new Error("Error occurred while saving the file");

      await db
         .update(profiles)
         .set({ profilePublicUrl: response.public_id, profileSecureUrl: response.secure_url })
         .where(and(eq(profiles.id, args.rowId), eq(profiles.userId, session.user.userId)));
   } catch (err: unknown) {
      if (err instanceof Error) throw new Error(err.message);
      throw new Error("Error occurred while updating image");
   }
}
