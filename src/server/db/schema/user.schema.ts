import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

import { experiences } from "./experience.schema";
import { educations } from "./education.schema";
import { projects } from "./project.schema";
import { profile } from "./profile.schema";
import { skills } from "./skill.schema";

/**
 * for multiple projects, use the project name as suffix of the table
 * export const createTable = pgTableCreator((name) => `profilefolio_${name}`);
 * export const users = createTable("users", { ... });
 */

export const users = pgTable(
   "users",
   {
      id: uuid("id").defaultRandom().primaryKey(),
      username: varchar("user_name", { length: 50 }).unique().notNull(),
      name: varchar("name", { length: 100 }).notNull(),
      email: varchar("email", { length: 200 }).notNull().unique(),
      password: varchar("password", { length: 200 }).notNull(),
      resetPassword: varchar("reset_password", { length: 100 }).default(""),
      createdAt: timestamp("created_at")
         .default(sql`CURRENT_TIMESTAMP`)
         .notNull(),
   },
   (table) => ({
      usernameIndex: index("username_index").on(table.username),
   })
);

export const userRelations = relations(users, ({ many, one }) => ({
   // for one to one relations
   profile: one(profile, { fields: [users.id], references: [profile.userId] }),
   // one to many relations
   skills: many(skills),
   educations: many(educations),
   experiences: many(experiences),
   projects: many(projects),
}));
