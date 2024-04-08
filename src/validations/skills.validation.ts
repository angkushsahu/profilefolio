import { z } from "zod";

import { IdValidation } from "./common.validation";

export const createSkill = z.object({
   title: z.string().min(1, { message: "Required field" }).max(200, { message: "Cannot exceed 200 characters" }),
   skills: z
      .array(z.string().min(1, { message: "Required field" }).max(200, { message: "Cannot exceed 200 characters" }))
      .nullable(),
});

export type CreateSkillType = z.infer<typeof createSkill>;

export const skillValidation = IdValidation.merge(createSkill);

export type SkillType = z.infer<typeof skillValidation>;
