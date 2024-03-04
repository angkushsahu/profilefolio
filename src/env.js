import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
   server: {
      NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
      NEXTAUTH_SECRET: process.env.NODE_ENV === "production" ? z.string() : z.string().optional(),
      NEXTAUTH_URL: z.preprocess((str) => process.env.VERCEL_URL ?? str, process.env.VERCEL ? z.string() : z.string().url()),
      // DATABASE_URI: z.string(),
      // MAIL_SERVICE: z.string(),
      // MAIL: z.string(),
      // MAIL_PASS: z.string(),
   },

   client: {
      NEXT_PUBLIC_COOKIEAGE: z.string().min(1),
      NEXT_PUBLIC_JWT_SECRET: z.string().min(1),
   },

   runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      // DATABASE_URI: process.env.DATABASE_URI,
      NEXT_PUBLIC_COOKIEAGE: process.env.NEXT_PUBLIC_COOKIEAGE,
      NEXT_PUBLIC_JWT_SECRET: process.env.NEXT_PUBLIC_JWT_SECRET,
      // MAIL_SERVICE: process.env.MAIL_SERVICE,
      // MAIL: process.env.MAIL,
      // MAIL_PASS: process.env.MAIL_PASS,
   },

   skipValidation: !!process.env.SKIP_ENV_VALIDATION,
   emptyStringAsUndefined: true,
});
