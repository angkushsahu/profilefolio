import { portfolioInfoSchema, verifyUsernameSchema } from "~/validations";
import { createTRPCRouter, publicProcedure } from "../trpc";
import jsonToObjArray from "~/lib/convertJsonToObjectArray";
import * as query from "~/server/db/queries";
import { months } from "~/constants";

export const portfolioRouter = createTRPCRouter({
   verifyUsername: publicProcedure.input(verifyUsernameSchema).query(async ({ input }) => {
      const user = await query.getUserByUsername.execute({ username: input.username });
      if (!user) return null;

      const returnUser = {
         id: user.id,
         name: user.name,
         username: user.username,
         email: user.email,
         createdAt: user.createdAt,
      };
      return { message: "User found successfully", user: returnUser };
   }),

   getPortfolioInfo: publicProcedure.input(portfolioInfoSchema).query(async ({ input }) => {
      const { userId } = input;

      const user = await query.getUserById.execute({ userId });
      const profile = await query.getProfileByUserId.execute({ userId });
      const educations = await query.getAllEducations.execute({ userId });
      const experiences = await query.getAllExperiences.execute({ userId });
      const projects = await query.getAllProjects.execute({ userId });
      const skills = await query.getAllSkills.execute({ userId });

      let updatedProfile = profile;
      if (profile) updatedProfile = jsonToObjArray(profile);

      if (educations) {
         educations.sort((a, b) => {
            const aYear = parseInt(a.startYear);
            const bYear = parseInt(b.startYear);

            if (aYear !== bYear) return bYear - aYear;

            const aIndex = months.indexOf(a.startMonth);
            const bIndex = months.indexOf(b.startMonth);
            return bIndex - aIndex;
         });
      }

      if (experiences) {
         experiences.sort((a, b) => {
            const aYear = parseInt(a.startYear);
            const bYear = parseInt(b.startYear);

            if (aYear !== bYear) return bYear - aYear;

            const aIndex = months.indexOf(a.startMonth);
            const bIndex = months.indexOf(b.startMonth);
            return bIndex - aIndex;
         });
      }

      if (projects) {
         projects.sort((a, b) => {
            if (!a.startMonth || !a.startYear) return 1;
            else if (!b.startMonth || !b.startYear) return -1;

            const aYear = parseInt(a.startYear);
            const bYear = parseInt(b.startYear);

            if (aYear !== bYear) return bYear - aYear;

            const aIndex = months.indexOf(a.startMonth);
            const bIndex = months.indexOf(b.startMonth);
            return bIndex - aIndex;
         });
      }

      return {
         message: "Portfolio details fetched successfully",
         info: { user, profile: updatedProfile, educations, experiences, projects, skills },
      };
   }),
});
