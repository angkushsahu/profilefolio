import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { createProfile, profileValidation, IdValidation, imageWithIdValidation } from "~/validations";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { profile as profiles } from "~/server/db/getSchema";
import * as query from "~/server/db/queries";

export const profileRouter = createTRPCRouter({
   createProfile: protectedProcedure.input(createProfile).mutation(async ({ ctx, input }) => {
      try {
         const profile = await ctx.db
            .insert(profiles)
            .values({ ...input, userId: ctx.user.id })
            .returning();
         if (!profile?.[0])
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to create your profile" });

         return { message: "Created profile successfully", profile: profile[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   updateProfile: protectedProcedure.input(profileValidation).mutation(async ({ ctx, input }) => {
      try {
         const { id, ...restOfProfile } = input;
         const profile = await ctx.db
            .update(profiles)
            .set(restOfProfile)
            .where(and(eq(profiles.id, id), eq(profiles.userId, ctx.user.id)))
            .returning();
         if (!profile?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });

         return { message: "Profile updated successfully", profile: profile[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getProfile: protectedProcedure.input(IdValidation).query(async ({ ctx, input }) => {
      try {
         const profile = await query.getProfileById.execute({ profileId: input.id });
         if (!profile) throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });
         if (profile.userId !== ctx.user.id)
            throw new TRPCError({ code: "UNAUTHORIZED", message: "You cannot access this resource" });
         return { message: "Fetched profile successfully", profile };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   addBannerImage: protectedProcedure.input(imageWithIdValidation).mutation(async ({ ctx, input }) => {
      try {
         const { id, publicUrl, secureUrl } = input;
         const profile = await ctx.db
            .update(profiles)
            .set({ bannerPublicUrl: publicUrl, bannerSecureUrl: secureUrl })
            .where(and(eq(profiles.id, id), eq(profiles.userId, ctx.user.id)))
            .returning();
         if (!profile?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });

         return { message: "Profile updated successfully", profile: profile[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   removeBannerImage: protectedProcedure.input(IdValidation).mutation(async ({ ctx, input }) => {
      try {
         const { id } = input;
         const profile = await ctx.db
            .update(profiles)
            .set({ bannerPublicUrl: null, bannerSecureUrl: null })
            .where(and(eq(profiles.id, id), eq(profiles.userId, ctx.user.id)))
            .returning();
         if (!profile?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });

         return { message: "Profile updated successfully", profile: profile[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   addProfileImage: protectedProcedure.input(imageWithIdValidation).mutation(async ({ ctx, input }) => {
      try {
         const { id, publicUrl, secureUrl } = input;
         const profile = await ctx.db
            .update(profiles)
            .set({ profilePublicUrl: publicUrl, profileSecureUrl: secureUrl })
            .where(and(eq(profiles.id, id), eq(profiles.userId, ctx.user.id)))
            .returning();
         if (!profile?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });

         return { message: "Profile updated successfully", profile: profile[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   removeProfileImage: protectedProcedure.input(IdValidation).mutation(async ({ ctx, input }) => {
      try {
         const { id } = input;
         const profile = await ctx.db
            .update(profiles)
            .set({ profilePublicUrl: null, profileSecureUrl: null })
            .where(and(eq(profiles.id, id), eq(profiles.userId, ctx.user.id)))
            .returning();
         if (!profile?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Profile not found" });

         return { message: "Profile updated successfully", profile: profile[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
