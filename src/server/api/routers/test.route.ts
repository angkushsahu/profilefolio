import { createTRPCRouter, publicProcedure } from "../trpc";
import { users } from "~/server/db/getSchema";
import { db } from "~/server/db";

export const testRouter = createTRPCRouter({
   test: publicProcedure.query(async () => {
      await db.select().from(users);
      return { success: true, message: "Test route working successfully" };
   }),
});
