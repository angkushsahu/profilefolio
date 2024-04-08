import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { createEducation, educationValidation, IdValidation } from "~/validations";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { educations } from "~/server/db/getSchema";
import * as query from "~/server/db/queries";
import { months } from "~/constants";

export const educationRouter = createTRPCRouter({
   createEducation: protectedProcedure.input(createEducation).mutation(async ({ ctx, input }) => {
      try {
         const { endDate, startDate, ...restOfEducation } = input;
         const education = await ctx.db
            .insert(educations)
            .values({
               ...restOfEducation,
               endMonth: endDate?.month,
               endYear: endDate?.year,
               startMonth: startDate.month,
               startYear: startDate.year,
               userId: ctx.user.id,
            })
            .returning();
         if (!education?.[0]) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to create new education" });

         return { message: "Created education successfully", education: education[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   updateEducation: protectedProcedure.input(educationValidation).mutation(async ({ ctx, input }) => {
      try {
         const { id, endDate, startDate, ...restOfEducation } = input;
         const education = await ctx.db
            .update(educations)
            .set({
               ...restOfEducation,
               endMonth: endDate?.month,
               endYear: endDate?.year,
               startMonth: startDate.month,
               startYear: startDate.year,
            })
            .where(and(eq(educations.id, id), eq(educations.userId, ctx.user.id)))
            .returning();
         if (!education?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Education not found" });

         return { education: education[0], message: "Education updated successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   deleteEducation: protectedProcedure.input(IdValidation).mutation(async ({ ctx, input }) => {
      try {
         const education = await ctx.db
            .delete(educations)
            .where(and(eq(educations.id, input.id), eq(educations.userId, ctx.user.id)))
            .returning();
         if (!education?.length) throw new TRPCError({ code: "NOT_FOUND", message: "Education not found" });
         return { message: "Education deleted successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getAllEducations: protectedProcedure.query(async ({ ctx }) => {
      try {
         const allEducations = await query.getAllEducations.execute({ userId: ctx.user.id });
         if (!allEducations) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to fetch all educations" });

         allEducations.sort((a, b) => {
            const aYear = parseInt(a.startYear);
            const bYear = parseInt(b.startYear);

            if (aYear !== bYear) return bYear - aYear;

            const aIndex = months.indexOf(a.startMonth);
            const bIndex = months.indexOf(b.startMonth);
            return bIndex - aIndex;
         });

         return { educations: allEducations, message: "Fetched all educations successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getEducation: protectedProcedure.input(IdValidation).query(async ({ ctx, input }) => {
      try {
         const education = await query.getEducationById.execute({ educationId: input.id });
         if (!education) throw new TRPCError({ code: "NOT_FOUND", message: "Education not found" });
         if (education.userId !== ctx.user.id)
            throw new TRPCError({ code: "UNAUTHORIZED", message: "You cannot access this resource" });
         return { message: "Fetched education successfully", education };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
