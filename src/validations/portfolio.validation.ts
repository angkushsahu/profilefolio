import { z } from "zod";

export const verifyUsernameSchema = z.object({
   username: z.string().min(1, { message: "Required field" }),
});

export type VerifyUsernameType = z.infer<typeof verifyUsernameSchema>;

export const portfolioInfoSchema = z.object({
   userId: z.string().min(1, { message: "Required field" }),
   username: z.string().min(1, { message: "Required field" }),
});

export type PortfolioInfoType = z.infer<typeof portfolioInfoSchema>;
