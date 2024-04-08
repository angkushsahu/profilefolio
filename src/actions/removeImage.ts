"use server";

import { and, eq } from "drizzle-orm";

import { profile as profiles, projects } from "~/server/db/getSchema";
import { getServerAuthSession } from "~/server/auth";
import type { UploadImageArgs } from "./types";
import cloudinary from "~/lib/cloudinary";
import { db } from "~/server/db";

export async function removeImage(args: Omit<UploadImageArgs, "secureUrl">) {
   try {
      const { publicUrl } = args;
      if (!publicUrl) return;

      await cloudinary.uploader.destroy(publicUrl);
   } catch (err: unknown) {
      if (err instanceof Error) throw new Error(err.message);
      throw new Error("Error occurred while updating image");
   }
}

export async function removeProjectImage(args: Omit<UploadImageArgs, "secureUrl">) {
   try {
      const session = await getServerAuthSession();
      if (!session) return;

      await removeImage(args);

      await db
         .update(projects)
         .set({ publicUrl: null, secureUrl: null })
         .where(and(eq(projects.id, args.rowId), eq(projects.userId, session.user.userId)));
   } catch (err: unknown) {
      if (err instanceof Error) throw new Error(err.message);
      throw new Error("Error occurred while updating image");
   }
}

export async function removeProfileImage(args: Omit<UploadImageArgs, "secureUrl">) {
   try {
      const session = await getServerAuthSession();
      if (!session) return;

      await removeImage(args);

      await db
         .update(profiles)
         .set({ profilePublicUrl: null, profileSecureUrl: null })
         .where(and(eq(profiles.id, args.rowId), eq(profiles.userId, session.user.userId)));
   } catch (err: unknown) {
      if (err instanceof Error) throw new Error(err.message);
      throw new Error("Error occurred while updating image");
   }
}
