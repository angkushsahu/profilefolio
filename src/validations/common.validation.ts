import { z } from "zod";

export const IdValidation = z.object({ id: z.number() }); // TODO: to be changed into a string after adding database

export type IdValidationType = z.infer<typeof IdValidation>;
