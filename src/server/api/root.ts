import { experienceRouter } from "./routers/experience.route";
import { educationRouter } from "./routers/education.route";
import { projectRouter } from "./routers/projects.route";
import { profileRouter } from "./routers/profile.route";
import { skillsRouter } from "./routers/skills.route";
import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth.route";
import { userRouter } from "./routers/user.route";

export const appRouter = createTRPCRouter({
   auth: authRouter,
   user: userRouter,
   skills: skillsRouter,
   project: projectRouter,
   profile: profileRouter,
   education: educationRouter,
   experience: experienceRouter,
});

export type AppRouter = typeof appRouter;
