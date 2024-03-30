import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getServerAuthSession } from "~/server/auth";
import { getUserById } from "../db/queries";
import { db } from "~/server/db";

export const createTRPCContext = async (opts: { headers: Headers }) => {
   const session = await getServerAuthSession();

   return {
      db,
      session,
      ...opts,
   };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
   transformer: superjson,
   errorFormatter({ shape, error }) {
      return {
         ...shape,
         data: {
            ...shape.data,
            zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
         },
      };
   },
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
   if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Login to access this resource" });

   const user = await getUserById.execute({ userId: ctx.session.user.userId });
   if (!user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Login to access this resource" });

   return next({ ctx: { session: ctx.session, user } });
});
