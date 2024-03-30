import { eq, sql } from "drizzle-orm";

import { educations } from "../getSchema";
import { db } from "../index";

export const getEducationById = db.query.educations
   .findFirst({
      where: eq(educations.id, sql.placeholder("educationId")),
   })
   .prepare("get-education-by-id");

export const getAllEducations = db.query.educations
   .findMany({
      where: eq(educations.userId, sql.placeholder("userId")),
   })
   .prepare("get-all-educations");
