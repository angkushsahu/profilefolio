import { eq, sql } from "drizzle-orm";

import { skills } from "../getSchema";
import { db } from "../index";

export const getSkillById = db.query.skills
   .findFirst({
      where: eq(skills.id, sql.placeholder("skillId")),
   })
   .prepare("get-skill-by-id");

export const getAllSkills = db.query.skills
   .findMany({
      where: eq(skills.userId, sql.placeholder("userId")),
   })
   .prepare("get-all-skills");
