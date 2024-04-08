import { slugValidation } from "~/validations";

export function parseSlug(params: unknown): string {
   const parsedParams = slugValidation.safeParse(params);
   if (!parsedParams.success) throw new Error("Required slug is not present in the URL");
   return parsedParams.data.slug;
}
