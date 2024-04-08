import { TRPCError } from "@trpc/server";
import { eq, sql } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { profile as profiles } from "~/server/db/getSchema";
import jsonToObjArray from "~/lib/convertJsonToObjectArray";
import { updateProfileValidation } from "~/validations";
import * as query from "~/server/db/queries";

export const profileRouter = createTRPCRouter({
   updateProfile: protectedProcedure.input(updateProfileValidation).mutation(async ({ ctx, input }) => {
      try {
         const { id: _, ...restOfProfile } = input;

         const websiteLinks: Record<string, string> = {};
         for (const { key, value } of input.websiteLinks) websiteLinks[key] = value;

         const profile = await ctx.db
            .update(profiles)
            .set({ ...restOfProfile, websiteLinks: sql`${JSON.stringify(websiteLinks)}::json` })
            .where(eq(profiles.userId, ctx.user.id))
            .returning();
         if (!profile?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });

         const updatedProfile = jsonToObjArray(profile[0]);
         return { message: "Profile updated successfully", profile: updatedProfile };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getProfile: protectedProcedure.query(async ({ ctx }) => {
      try {
         const profile = await query.getProfileByUserId.execute({ userId: ctx.user.id });
         if (!profile) throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });

         const updatedProfile = jsonToObjArray(profile);
         return { message: "Fetched profile successfully", profile: updatedProfile };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
