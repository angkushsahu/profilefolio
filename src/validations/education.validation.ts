import { z } from "zod";

import { IdValidation } from "./common.validation";

export const baseCreateEducation = z.object({
   institute: z.string().min(1, { message: "Required field" }).max(300, { message: "Cannot exceed 300 characters" }),
   degree: z.string().max(300, { message: "Cannot exceed 300 characters" }).nullable(),
   fieldOfStudy: z.string().max(300, { message: "Cannot exceed 300 characters" }).nullable(),
   startDate: z.object({
      month: z.string().min(1, { message: "Required field" }),
      year: z.string().min(1, { message: "Required field" }),
   }),
   endDate: z
      .object({
         month: z.string().nullable(),
         year: z.string().nullable(),
      })
      .nullable(),
   currentlyWorking: z.boolean().default(false).nullable(),
   grade: z.string().max(20, { message: "Cannot exceed 20 characters" }).nullable(),
   activities: z.string().max(300, { message: "Cannot exceed 300 characters" }).nullable(),
});

export const createEducation = baseCreateEducation.superRefine((data, ctx) => {
   if (data.currentlyWorking) return true;
   if (!data.currentlyWorking && !!data.endDate && !!data.endDate.month && !!data.endDate.year) return true;

   if (!data.endDate?.month) ctx.addIssue({ path: ["endDate.month"], message: "Required field", code: z.ZodIssueCode.custom });
   if (!data.endDate?.year) ctx.addIssue({ path: ["endDate.year"], message: "Required field", code: z.ZodIssueCode.custom });
});

export type CreateEducationType = z.infer<typeof createEducation>;

export const educationValidation = IdValidation.merge(baseCreateEducation);

export type EducationType = z.infer<typeof educationValidation>;
