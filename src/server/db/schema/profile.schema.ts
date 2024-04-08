import { index, json, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { type InferSelectModel, relations, sql } from "drizzle-orm";
import { users } from "./user.schema";

export const profile = pgTable(
   "profile",
   {
      id: uuid("id").defaultRandom().primaryKey(),
      userId: uuid("user_id")
         .notNull()
         .references(() => users.id, { onDelete: "cascade" }),
      headline: varchar("headline", { length: 400 }).notNull(),
      currentPosition: varchar("current_position", { length: 200 }),
      about: varchar("about", { length: 3000 }),
      profilePublicUrl: varchar("profile_public_url", { length: 500 }),
      profileSecureUrl: varchar("profile_secure_url", { length: 500 }),
      location: varchar("location", { length: 300 }),
      websiteLinks: json("website_links"),
      phone: varchar("phone", { length: 20 }),
      createdAt: timestamp("created_at")
         .default(sql`CURRENT_TIMESTAMP`)
         .notNull(),
   },
   (table) => ({
      profileIndex: index("user_profile_index").on(table.userId),
   })
);

export const profileRelations = relations(profile, ({ one }) => ({
   user: one(users, { fields: [profile.userId], references: [users.id] }),
}));

export type UserProfileSelectType = InferSelectModel<typeof profile>;
