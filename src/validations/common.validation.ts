import { z } from "zod";

export const IdValidation = z.object({ id: z.string() });

export type IdValidationType = z.infer<typeof IdValidation>;

export const slugValidation = z.object({
   slug: z.string().min(1),
});

export type SlugType = z.infer<typeof slugValidation>;
