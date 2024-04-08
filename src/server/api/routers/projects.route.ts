import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import { createProject, projectValidation, IdValidation } from "~/validations";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { projects } from "~/server/db/getSchema";
import * as query from "~/server/db/queries";
import cloudinary from "~/lib/cloudinary";
import { months } from "~/constants";

export const projectRouter = createTRPCRouter({
   createProject: protectedProcedure.input(createProject).mutation(async ({ ctx, input }) => {
      try {
         const { endDate, startDate, ...restOfProject } = input;
         const project = await ctx.db
            .insert(projects)
            .values({
               ...restOfProject,
               endMonth: endDate?.month,
               endYear: endDate?.year,
               startMonth: startDate?.month,
               startYear: startDate?.year,
               userId: ctx.user.id,
            })
            .returning();
         if (!project?.[0]) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to create new project" });

         return { message: "Created project successfully", project: project[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   updateProject: protectedProcedure.input(projectValidation).mutation(async ({ ctx, input }) => {
      try {
         const { id, endDate, startDate, ...restOfProject } = input;
         const project = await ctx.db
            .update(projects)
            .set({
               ...restOfProject,
               endMonth: endDate?.month,
               endYear: endDate?.year,
               startMonth: startDate?.month,
               startYear: startDate?.year,
            })
            .where(and(eq(projects.id, id), eq(projects.userId, ctx.user.id)))
            .returning();
         if (!project?.[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });

         return { message: "Project updated successfully", project: project[0] };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   deleteProject: protectedProcedure.input(IdValidation).mutation(async ({ ctx, input }) => {
      try {
         const project = await ctx.db
            .delete(projects)
            .where(and(eq(projects.id, input.id), eq(projects.userId, ctx.user.id)))
            .returning({ publicUrl: projects.publicUrl, secureUrl: projects.secureUrl });
         if (!project?.length || !project[0]) throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });

         if (project[0].publicUrl) await cloudinary.uploader.destroy(project[0].publicUrl);

         return { message: "Project deleted successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getAllProjects: protectedProcedure.query(async ({ ctx }) => {
      try {
         const allProjects = await query.getAllProjects.execute({ userId: ctx.user.id });
         if (!allProjects) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to fetch all projects" });

         allProjects.sort((a, b) => {
            if (!a.startMonth || !a.startYear) return 1;
            else if (!b.startMonth || !b.startYear) return -1;

            const aYear = parseInt(a.startYear);
            const bYear = parseInt(b.startYear);

            if (aYear !== bYear) return bYear - aYear;

            const aIndex = months.indexOf(a.startMonth);
            const bIndex = months.indexOf(b.startMonth);
            return bIndex - aIndex;
         });

         return { projects: allProjects, message: "Fetched all projects successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getProject: protectedProcedure.input(IdValidation).query(async ({ ctx, input }) => {
      try {
         const project = await query.getProjectById.execute({ projectId: input.id });
         if (!project) throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
         if (project.userId !== ctx.user.id)
            throw new TRPCError({ code: "UNAUTHORIZED", message: "You cannot access this resource" });
         return { message: "Fetched project successfully", project };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
