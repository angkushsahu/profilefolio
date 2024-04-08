import { z } from "zod";

import { EMPLOYMENT_TYPE_VALUES, LOCATION_TYPE_VALUES } from "~/constants";
import { IdValidation } from "./common.validation";

export const baseCreateExperience = z.object({
   companyName: z.string().min(1, { message: "Required field" }).max(200, { message: "Cannot exceed 200 characters" }),
   jobTitle: z.string().min(1, { message: "Required field" }).max(200, { message: "Cannot exceed 200 characters" }),
   industry: z.string().max(200, { message: "Cannot exceed 200 characters" }).nullable(),
   employmentType: z.enum(EMPLOYMENT_TYPE_VALUES, { required_error: "Required field", invalid_type_error: "Invalid value" }),
   locationType: z.enum(LOCATION_TYPE_VALUES, { required_error: "Required field", invalid_type_error: "Invalid value" }),
   location: z.string().max(200, { message: "Cannot exceed 200 characters" }).nullable(),
   skills: z.string().max(500, { message: "Cannot exceed 500 characters" }).nullable(),
   description: z.string().max(500, { message: "Cannot exceed 500 characters" }).nullable(),
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
});

export const createExperience = baseCreateExperience.superRefine((data, ctx) => {
   if (data.currentlyWorking) return true;
   if (!data.currentlyWorking && !!data.endDate && !!data.endDate.month && !!data.endDate.year) return true;

   if (!data.endDate?.month) ctx.addIssue({ path: ["endDate.month"], message: "Required field", code: z.ZodIssueCode.custom });
   if (!data.endDate?.year) ctx.addIssue({ path: ["endDate.year"], message: "Required field", code: z.ZodIssueCode.custom });
});

export type CreateExperienceType = z.infer<typeof createExperience>;

export const experienceValidation = IdValidation.merge(baseCreateExperience);

export type ExperienceType = z.infer<typeof experienceValidation>;
