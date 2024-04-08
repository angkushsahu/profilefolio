import { boolean, index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { type InferSelectModel, relations, sql } from "drizzle-orm";
import { users } from "./user.schema";

export const educations = pgTable(
   "educations",
   {
      id: uuid("id").defaultRandom().primaryKey(),
      userId: uuid("user_id")
         .notNull()
         .references(() => users.id, { onDelete: "cascade" }),
      institute: varchar("institute_name", { length: 300 }).notNull(),
      degree: varchar("degree", { length: 300 }).default(""),
      fieldOfStudy: varchar("field_of_study", { length: 300 }).default(""),
      grade: varchar("grade", { length: 20 }).default(""),
      activities: varchar("activities", { length: 300 }).default(""),
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
      userEducationIndex: index("user_education_index").on(table.userId),
   })
);

export const educationRelations = relations(educations, ({ one }) => ({
   user: one(users, { fields: [educations.userId], references: [users.id] }),
}));

export type EducationSchemaType = InferSelectModel<typeof educations>;
