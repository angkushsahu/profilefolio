import { createHash, randomBytes } from "crypto";
import { TRPCError } from "@trpc/server";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";

import { forgotPasswordTrpcSchema, loginSchema, registerSchema, resetPasswordTrpcSchema } from "~/validations";
import { profile as profiles, users } from "~/server/db/getSchema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { sendResetEmail } from "~/lib/sendResetEmail";
import { hashStringWithBcrypt } from "~/lib";
import * as query from "~/server/db/queries";

export const authRouter = createTRPCRouter({
   register: publicProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
      try {
         const emailAlreadyExists = await query.getUserByEmail.execute({ email: input.email });
         if (emailAlreadyExists) throw new TRPCError({ code: "CONFLICT", message: "User already exists, login instead" });

         const usernameAlreadyExists = await query.getUserByUsername.execute({ username: input.username });
         if (usernameAlreadyExists)
            throw new TRPCError({ code: "CONFLICT", message: "User name already exists, try another user name" });

         // eslint-disable-next-line
         const { confirmPassword: _, ...userValues } = input;
         userValues.password = await hashStringWithBcrypt(userValues.password);
         const response = await ctx.db.insert(users).values(userValues).returning({ userId: users.id, name: users.name });
         if (!response?.[0]) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to create user" });

         const firstName = response[0].name.split(" ")[0];
         await ctx.db.insert(profiles).values({ headline: `Hello, this is ${firstName ?? "user"}`, userId: response[0].userId });

         return { message: "User register successfull", userId: response[0].userId };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
      try {
         const user = await query.getUserByEmail.execute({ email: input.email });
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "E-mail not registered, register instead" });

         const arePasswordsSame = await compare(input.password, user.password);
         if (!arePasswordsSame) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid credentials" });

         return { message: "User logged in successfully", userId: user.id };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   forgotPassword: publicProcedure.input(forgotPasswordTrpcSchema).mutation(async ({ ctx, input }) => {
      try {
         const user = await query.getUserByEmail.execute({ email: input.email });
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "E-mail not registered, register instead" });

         const resetToken = randomBytes(16).toString("hex");
         const resetPassword = createHash("sha256").update(resetToken).digest("hex");

         const mailResponse = await sendResetEmail({ email: input.email, resetToken, origin: input.originUrl });
         if (!mailResponse.success) throw new TRPCError({ message: mailResponse.message, code: "INTERNAL_SERVER_ERROR" });

         await ctx.db.update(users).set({ resetPassword }).where(eq(users.id, user.id));
         return { message: mailResponse.message };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   resetPassword: publicProcedure.input(resetPasswordTrpcSchema).mutation(async ({ ctx, input }) => {
      try {
         const resetPassword = createHash("sha256").update(input.resetId).digest("hex");
         const user = await query.getUserByResetPassword.execute({ resetPassword });
         if (!user) throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });

         const password = await hashStringWithBcrypt(input.password);
         await ctx.db.update(users).set({ resetPassword: "", password }).where(eq(users.id, user.id));
         return { message: "Password updated successfully, login with new credentials" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
