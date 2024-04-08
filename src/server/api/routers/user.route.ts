import { TRPCError } from "@trpc/server";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";

import { changePasswordSchema, updateAccountSchema, usernameSchema } from "~/validations";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { users } from "~/server/db/getSchema";
import * as query from "~/server/db/queries";
import { hashStringWithBcrypt } from "~/lib";
import cloudinary from "~/lib/cloudinary";

export const userRouter = createTRPCRouter({
   checkUniqueUsername: publicProcedure.input(usernameSchema).query(async ({ input }) => {
      try {
         const usernameAlreadyExists = await query.getUserByUsername.execute({ username: input.username });
         // eslint-disable-next-line
         if (!usernameAlreadyExists || (input.userId && usernameAlreadyExists.id === input.userId))
            return { success: true, message: "Username is available" };

         throw new TRPCError({ code: "CONFLICT", message: "User name already exists, try another user name" });
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getUser: protectedProcedure.query(async ({ ctx }) => {
      try {
         return { message: "User found successfully", user: ctx.user };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   changePassword: protectedProcedure.input(changePasswordSchema).mutation(async ({ ctx, input }) => {
      try {
         const user = await query.getUserByEmail.execute({ email: ctx.user.email });
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

         const arePasswordsSame = await compare(input.oldPassword, user.password);
         if (!arePasswordsSame) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid credentials" });

         const password = await hashStringWithBcrypt(input.password);
         await ctx.db.update(users).set({ password }).where(eq(users.id, ctx.user.id));
         return { message: "User account password updated successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   updateUser: protectedProcedure.input(updateAccountSchema).mutation(async ({ ctx, input }) => {
      try {
         const usernameAlreadyExists = await query.getUserByUsername.execute({ username: input.username });
         // eslint-disable-next-line
         if ((usernameAlreadyExists && usernameAlreadyExists.id !== ctx.user.id) || !usernameAlreadyExists)
            throw new TRPCError({ code: "CONFLICT", message: "User name already exists, try another user name" });

         await ctx.db.update(users).set(input).where(eq(users.id, ctx.user.id));
         const user = await query.getUserById.execute({ userId: ctx.user.id });
         if (!user) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to get updated user account details" });

         return { user, message: "User account updated successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   deleteUser: protectedProcedure.mutation(async ({ ctx }) => {
      try {
         const profile = await query.getProfileByUserId.execute({ userId: ctx.user.id });
         if (profile?.profilePublicUrl) await cloudinary.uploader.destroy(profile.profilePublicUrl);

         const user = await ctx.db.delete(users).where(eq(users.id, ctx.user.id)).returning();
         // eslint-disable-next-line
         if (!user || !user.length) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });
         return { message: "User account deleted successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
