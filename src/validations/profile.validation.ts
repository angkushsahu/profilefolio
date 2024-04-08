import { z } from "zod";

import { imageWithIdValidation } from "./image.validation";
import { IdValidation } from "./common.validation";

export const createProfile = z.object({
   headline: z.string().min(1, { message: "Required field" }).max(400, { message: "Cannot exceed 400 characters" }),
   currentPosition: z.string().max(200, { message: "Cannot exceed 200 characters" }).nullable(),
   location: z.string().max(300, { message: "Cannot exceed 300 characters" }).nullable(),
   phone: z.string().max(20, { message: "Cannot exceed 20 characters" }).nullable(),
   about: z.string().max(3000, { message: "Cannot exceed 3000 characters" }).nullable(),
   websiteLinks: z
      .object({
         key: z.string().min(1, { message: "Required field" }),
         value: z.string().url({ message: "Value must be a URL" }).min(1, { message: "Required field" }),
      })
      .array(),
});

export type CreateProfileType = z.infer<typeof createProfile>;

export const updateProfileValidation = IdValidation.merge(createProfile);

export type UpdateProfileType = z.infer<typeof updateProfileValidation>;

export const profileValidation = imageWithIdValidation.merge(createProfile);

export type ProfileType = z.infer<typeof profileValidation>;
