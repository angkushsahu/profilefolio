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
         month: z.string().nullable(),
         year: z.string().nullable(),
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
   const { currentlyWorking, endDate, startDate } = data;
   // if any of the startDate options are filled, then there should be error in the remaining date fields if they are empty
   if (!!startDate && (!!startDate.month || !!startDate.year)) {
      if (currentlyWorking) return true;
      if (!currentlyWorking && !!endDate && !!endDate.month && !!endDate.year) return true;

      if (!endDate?.month) ctx.addIssue({ path: ["endDate.month"], message: "Required field", code: z.ZodIssueCode.custom });
      if (!endDate?.year) ctx.addIssue({ path: ["endDate.year"], message: "Required field", code: z.ZodIssueCode.custom });

      if (!startDate?.month) ctx.addIssue({ path: ["startDate.month"], message: "Required field", code: z.ZodIssueCode.custom });
      if (!startDate?.year) ctx.addIssue({ path: ["startDate.year"], message: "Required field", code: z.ZodIssueCode.custom });
   }

   // if any of the endDate options are filled, then there should be error in the remaining date fields if they are empty
   if (!!endDate && (!!endDate.month || !!endDate.year)) {
      if (currentlyWorking) return true;
      if (!currentlyWorking && !!endDate && !!endDate.month && !!endDate.year) return true;

      if (!endDate?.month) ctx.addIssue({ path: ["endDate.month"], message: "Required field", code: z.ZodIssueCode.custom });
      if (!endDate?.year) ctx.addIssue({ path: ["endDate.year"], message: "Required field", code: z.ZodIssueCode.custom });

      if (!startDate?.month) ctx.addIssue({ path: ["startDate.month"], message: "Required field", code: z.ZodIssueCode.custom });
      if (!startDate?.year) ctx.addIssue({ path: ["startDate.year"], message: "Required field", code: z.ZodIssueCode.custom });
   }
});

export type CreateProjectType = z.infer<typeof createProject>;

export const projectValidation = imageWithIdValidation.merge(baseCreateProject);

export type ProjectType = z.infer<typeof projectValidation>;
