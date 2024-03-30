import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./user.schema";

export const projects = pgTable(
   "projects",
   {
      id: uuid("id").defaultRandom().primaryKey(),
      userId: uuid("user_id")
         .notNull()
         .references(() => users.id, { onDelete: "cascade" }),
      projectName: varchar("project_name", { length: 150 }).notNull(),
      githubLink: varchar("github_link", { length: 500 }),
      projectLink: varchar("project_link", { length: 500 }),
      publicUrl: varchar("image_public_url", { length: 500 }),
      secureUrl: varchar("image_secure_url", { length: 500 }),
      skills: varchar("skills", { length: 500 }),
      description: varchar("description", { length: 500 }),
      startMonth: varchar("start_month", { length: 10 }),
      startYear: varchar("start_year", { length: 10 }),
      endMonth: varchar("end_month", { length: 10 }),
      endYear: varchar("end_year", { length: 10 }),
      createdAt: timestamp("created_at")
         .default(sql`CURRENT_TIMESTAMP`)
         .notNull(),
   },
   (table) => ({
      userProjectIndex: index("user_project_index").on(table.userId),
   })
);

export const projectRelations = relations(projects, ({ one }) => ({
   user: one(users, { fields: [projects.userId], references: [users.id] }),
}));
