import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getServerAuthSession } from "~/server/auth";

export const createTRPCContext = async (opts: { headers: Headers }) => {
   const session = await getServerAuthSession();

   return {
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

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
   // TODO: Uncomment everything upon adding database for better authentication flow
   // if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });

   // const user = await User.findById(ctx.session.user.userId);
   // if (!user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Login to access this resource" });

   // return next({
   //    ctx: {
   //       session: { ...ctx.session, user: ctx.session.user },
   //       // user
   //    },
   // });
   return next();
});
