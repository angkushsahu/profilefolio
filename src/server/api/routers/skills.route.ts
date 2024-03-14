import { createSkill, skillValidation, type SkillType, IdValidation } from "~/validations";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const skillsArray: Array<SkillType> = [];

export const skillsRouter = createTRPCRouter({
   createSkill: protectedProcedure.input(createSkill).mutation(({ ctx, input }) => {
      const newSkill = { ...input, id: skillsArray.length };
      skillsArray.push(newSkill);
      return newSkill;
   }),

   updateSkill: protectedProcedure.input(skillValidation).mutation(({ ctx, input }) => {
      for (const skill of skillsArray) {
         if (skill.id === input.id) {
            skill.skills = input.skills;
            skill.title = input.title;
            break;
         }
      }
      return input;
   }),

   deleteSkill: protectedProcedure.input(IdValidation).mutation(({ ctx, input }) => {
      for (let i = 0; i < skillsArray.length; i++) {
         if (skillsArray[i]?.id === input.id) {
            skillsArray.splice(i, 1);
            break;
         }
      }
   }),

   getAllSkills: protectedProcedure.query(() => {
      return skillsArray;
   }),

   getSkill: protectedProcedure.input(IdValidation).query(({ ctx, input }) => {
      for (const skill of skillsArray) {
         if (skill.id === input.id) {
            return skill;
         }
      }
   }),
});
