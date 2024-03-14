import { createTRPCRouter } from "~/server/api/trpc";
import { skillsRouter } from "./routers/skills.route";

export const appRouter = createTRPCRouter({
   skills: skillsRouter,
});

export type AppRouter = typeof appRouter;
