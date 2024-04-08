import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
   server: {
      DATABASE_URL: z
         .string()
         .url()
         .refine((str) => !str.includes("YOUR_PSQL_URL_HERE"), "You forgot to change the default URL"),
      NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
      NEXTAUTH_SECRET: process.env.NODE_ENV === "production" ? z.string() : z.string().optional(),
      NEXTAUTH_URL: z.preprocess((str) => process.env.VERCEL_URL ?? str, process.env.VERCEL ? z.string() : z.string().url()),
      MAIL_SERVICE: z.string(),
      MAIL: z.string(),
      MAIL_PASS: z.string(),
      COOKIEAGE: z.string().min(1),
      JWT_SECRET: z.string().min(1),
      CLOUDINARY_CLOUD_NAME: z.string().min(1),
      CLOUDINARY_API_KEY: z.string().min(1),
      CLOUDINARY_API_SECRET: z.string().min(1),
   },

   client: {},

   runtimeEnv: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
      CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      COOKIEAGE: process.env.COOKIEAGE,
      JWT_SECRET: process.env.JWT_SECRET,
      MAIL_SERVICE: process.env.MAIL_SERVICE,
      MAIL: process.env.MAIL,
      MAIL_PASS: process.env.MAIL_PASS,
   },

   skipValidation: !!process.env.SKIP_ENV_VALIDATION,
   emptyStringAsUndefined: true,
});
