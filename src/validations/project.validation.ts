import { z } from "zod";

import { imageWithIdValidation } from "./image.validation";

export const baseCreateProject = z.object({
   projectName: z.string().min(1, { message: "Required field" }).max(150, { message: "Cannot exceed 150 characters" }),
   githubLink: z.string().max(500, { message: "Cannot exceed 500 characters" }).nullable(),
   projectLink: z.string().max(500, { message: "Cannot exceed 500 characters" }).nullable(),
   skills: z.string().max(500, { message: "Cannot exceed 500 characters" }).nullable(),
   description: z.string().max(500, { message: "Cannot exceed 500 characters" }).nullable(),
   startDate: z
      .object({
         month: z.string().min(1, { message: "Required field" }).nullable(),
         year: z.string().min(1, { message: "Required field" }).nullable(),
      })
      .nullable(),
   endDate: z
      .object({
         month: z.string().nullable(),
         year: z.string().nullable(),
      })
      .nullable(),
   currentlyWorking: z.boolean().default(false).nullable(),
});

export const createProject = baseCreateProject.superRefine((data, ctx) => {
   if (data.currentlyWorking) return true;
   if (!data.currentlyWorking && !!data.endDate && !!data.endDate.month && !!data.endDate.year) return true;

   if (!data.endDate?.month) ctx.addIssue({ path: ["endDate.month"], message: "Required field", code: z.ZodIssueCode.custom });
   if (!data.endDate?.year) ctx.addIssue({ path: ["endDate.year"], message: "Required field", code: z.ZodIssueCode.custom });
});

export type CreateProjectType = z.infer<typeof createProject>;

export const projectValidation = imageWithIdValidation.merge(baseCreateProject);

export type ProjectType = z.infer<typeof projectValidation>;
