import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { createSkill, skillValidation, IdValidation } from "~/validations";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { skills } from "~/server/db/getSchema";
import * as query from "~/server/db/queries";

export const skillsRouter = createTRPCRouter({
   createSkill: protectedProcedure.input(createSkill).mutation(async ({ ctx, input }) => {
      try {
         const uniqueSkills = [...new Set(input.skills)];

         const response = await ctx.db
            .insert(skills)
            .values({ title: input.title, userId: ctx.user.id, skills: uniqueSkills })
            .returning();
         if (!response?.[0])
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to create new skill" });

         return { message: "New skill created successfully", skill: response[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   updateSkill: protectedProcedure.input(skillValidation).mutation(async ({ ctx, input }) => {
      try {
         const uniqueSkills = [...new Set(input.skills)];
         const newSkill = await ctx.db
            .update(skills)
            .set({ skills: uniqueSkills, title: input.title })
            .where(and(eq(skills.id, input.id), eq(skills.userId, ctx.user.id)))
            .returning();
         if (!newSkill?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Skill not found" });

         return { skill: newSkill[0], message: "Skill updated successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   deleteSkill: protectedProcedure.input(IdValidation).mutation(async ({ ctx, input }) => {
      try {
         const skill = await ctx.db
            .delete(skills)
            .where(and(eq(skills.id, input.id), eq(skills.userId, ctx.user.id)))
            .returning();
         if (!skill?.length) throw new TRPCError({ code: "NOT_FOUND", message: "Skill not found" });
         return { message: "Skill deleted successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getAllSkills: protectedProcedure.query(async ({ ctx }) => {
      try {
         const allSkills = await query.getAllSkills.execute({ userId: ctx.user.id });
         if (!allSkills) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to fetch all skills" });
         return { skills: allSkills, message: "Fetched all skills successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getSkill: protectedProcedure.input(IdValidation).query(async ({ ctx, input }) => {
      try {
         const skill = await query.getSkillById.execute({ skillId: input.id });
         if (!skill) throw new TRPCError({ code: "NOT_FOUND", message: "Skill not found" });
         if (skill.userId !== ctx.user.id)
            throw new TRPCError({ code: "UNAUTHORIZED", message: "You cannot access this resource" });
         return { message: "Fetched skill successfully", skill };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
