import { index, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./user.schema";

export const skills = pgTable(
   "skills",
   {
      id: uuid("id").defaultRandom().primaryKey(),
      userId: uuid("user_id")
         .notNull()
         .references(() => users.id, { onDelete: "cascade" }),
      title: varchar("title", { length: 200 }).notNull(),
      skills: varchar("skills", { length: 200 }).array(),
      createdAt: timestamp("created_at")
         .default(sql`CURRENT_TIMESTAMP`)
         .notNull(),
   },
   (table) => ({
      userSkillIndex: index("user_skill_index").on(table.userId),
   })
);

export const skillRelations = relations(skills, ({ one }) => ({
   user: one(users, { fields: [skills.userId], references: [users.id] }),
}));
