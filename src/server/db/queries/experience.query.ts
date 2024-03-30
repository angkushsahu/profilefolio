import { eq, sql } from "drizzle-orm";

import { experiences } from "../getSchema";
import { db } from "../index";

export const getExperienceById = db.query.experiences
   .findFirst({
      where: eq(experiences.id, sql.placeholder("experienceId")),
   })
   .prepare("get-experience-by-id");

export const getAllExperiences = db.query.experiences
   .findMany({
      where: eq(experiences.userId, sql.placeholder("userId")),
   })
   .prepare("get-all-experiences");
