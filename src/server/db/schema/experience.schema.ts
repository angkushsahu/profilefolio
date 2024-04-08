import { boolean, index, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { type InferSelectModel, relations, sql } from "drizzle-orm";

import { EMPLOYMENT_TYPE_VALUES, LOCATION_TYPE_VALUES } from "~/constants";
import { users } from "./user.schema";

export const employmentTypeEnum = pgEnum("employment_type", EMPLOYMENT_TYPE_VALUES);

export const locationTypeEnum = pgEnum("location_type", LOCATION_TYPE_VALUES);

export const experiences = pgTable(
   "experiences",
   {
      id: uuid("id").defaultRandom().primaryKey(),
      userId: uuid("user_id")
         .notNull()
         .references(() => users.id, { onDelete: "cascade" }),
      companyName: varchar("company_name", { length: 200 }).notNull(),
      jobTitle: varchar("job_title", { length: 200 }).notNull(),
      industry: varchar("industry", { length: 200 }),
      employmentType: employmentTypeEnum("employment_type").notNull(),
      locationType: locationTypeEnum("location_type").notNull(),
      location: varchar("location", { length: 200 }),
      skills: varchar("skills", { length: 500 }),
      description: varchar("description", { length: 500 }),
      startMonth: varchar("start_month", { length: 10 }).notNull(),
      startYear: varchar("start_year", { length: 10 }).notNull(),
      endMonth: varchar("end_month", { length: 10 }),
      endYear: varchar("end_year", { length: 10 }),
      currentlyWorking: boolean("currently_working").default(false),
      createdAt: timestamp("created_at")
         .default(sql`CURRENT_TIMESTAMP`)
         .notNull(),
   },
   (table) => ({
      userExperienceIndex: index("user_experience_index").on(table.userId),
   })
);

export const experienceRelations = relations(experiences, ({ one }) => ({
   user: one(users, { fields: [experiences.userId], references: [users.id] }),
}));

export type ExperienceSchemaType = InferSelectModel<typeof experiences>;
