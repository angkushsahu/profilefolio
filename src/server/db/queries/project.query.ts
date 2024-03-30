import { eq, sql } from "drizzle-orm";

import { projects } from "../getSchema";
import { db } from "../index";

export const getProjectById = db.query.projects
   .findFirst({
      where: eq(projects.id, sql.placeholder("projectId")),
   })
   .prepare("get-project-by-id");

export const getAllProjects = db.query.projects
   .findMany({
      where: eq(projects.userId, sql.placeholder("userId")),
   })
   .prepare("get-all-projects");
