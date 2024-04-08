import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { IdValidation, createExperience, experienceValidation } from "~/validations";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { experiences } from "~/server/db/getSchema";
import * as query from "~/server/db/queries";
import { months } from "~/constants";

export const experienceRouter = createTRPCRouter({
   createExperience: protectedProcedure.input(createExperience).mutation(async ({ ctx, input }) => {
      try {
         const { endDate, startDate, ...restOfExperience } = input;
         const experience = await ctx.db
            .insert(experiences)
            .values({
               ...restOfExperience,
               endMonth: endDate?.month,
               endYear: endDate?.year,
               startMonth: startDate.month,
               startYear: startDate.year,
               userId: ctx.user.id,
            })
            .returning();
         if (!experience?.[0]) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to create new experience" });

         return { message: "Created experience successfully", experience: experience[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   updateExperience: protectedProcedure.input(experienceValidation).mutation(async ({ ctx, input }) => {
      try {
         const { id, endDate, startDate, ...restOfExperience } = input;
         const experience = await ctx.db
            .update(experiences)
            .set({
               ...restOfExperience,
               endMonth: endDate?.month,
               endYear: endDate?.year,
               startMonth: startDate.month,
               startYear: startDate.year,
            })
            .where(and(eq(experiences.id, id), eq(experiences.userId, ctx.user.id)))
            .returning();
         if (!experience?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Experience not found" });

         return { experience: experience[0], message: "Experience updated successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   deleteExperience: protectedProcedure.input(IdValidation).mutation(async ({ ctx, input }) => {
      try {
         const experience = await ctx.db
            .delete(experiences)
            .where(and(eq(experiences.id, input.id), eq(experiences.userId, ctx.user.id)))
            .returning();
         if (!experience?.length) throw new TRPCError({ code: "NOT_FOUND", message: "Experience not found" });
         return { message: "Experience deleted successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getAllExperiences: protectedProcedure.query(async ({ ctx }) => {
      try {
         const allExperiences = await query.getAllExperiences.execute({ userId: ctx.user.id });
         if (!allExperiences) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to fetch all experiences" });

         allExperiences.sort((a, b) => {
            const aYear = parseInt(a.startYear);
            const bYear = parseInt(b.startYear);

            if (aYear !== bYear) return bYear - aYear;

            const aIndex = months.indexOf(a.startMonth);
            const bIndex = months.indexOf(b.startMonth);
            return bIndex - aIndex;
         });

         return { experiences: allExperiences, message: "Fetched all experiences successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getExperience: protectedProcedure.input(IdValidation).query(async ({ ctx, input }) => {
      try {
         const experience = await query.getExperienceById.execute({ experienceId: input.id });
         if (!experience) throw new TRPCError({ code: "NOT_FOUND", message: "Experience not found" });
         if (experience.userId !== ctx.user.id)
            throw new TRPCError({ code: "UNAUTHORIZED", message: "You cannot access this resource" });
         return { message: "Fetched experience successfully", experience };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
