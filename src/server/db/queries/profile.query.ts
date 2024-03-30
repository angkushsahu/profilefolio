import { eq, sql } from "drizzle-orm";

import { profile } from "../getSchema";
import { db } from "../index";

export const getProfileById = db.query.profile
   .findFirst({
      where: eq(profile.id, sql.placeholder("profileId")),
   })
   .prepare("get-profile-by-id");
