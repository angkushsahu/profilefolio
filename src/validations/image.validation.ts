import { z } from "zod";

import { IdValidation } from "./common.validation";

export const imageValidation = z.object({
   publicUrl: z.string().nullable(),
   secureUrl: z.string().nullable(),
});

export type ImageType = z.infer<typeof imageValidation>;

export const imageWithIdValidation = IdValidation.merge(imageValidation);

export type ImageWithIdType = z.infer<typeof imageWithIdValidation>;
