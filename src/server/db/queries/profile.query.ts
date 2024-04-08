import { eq, sql } from "drizzle-orm";

import { profile } from "../getSchema";
import { db } from "../index";

export const getProfileByUserId = db.query.profile
   .findFirst({
      where: eq(profile.userId, sql.placeholder("userId")),
   })
   .prepare("get-profile-by-user-id");
