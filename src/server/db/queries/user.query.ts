import { eq, sql } from "drizzle-orm";

import { users } from "../getSchema";
import { db } from "../index";

export const getUserById = db.query.users
   .findFirst({
      where: eq(users.id, sql.placeholder("userId")),
      columns: { createdAt: true, email: true, id: true, name: true, username: true },
   })
   .prepare("get-user-by-id");

export const getUserByEmail = db.query.users
   .findFirst({
      where: eq(users.email, sql.placeholder("email")),
   })
   .prepare("get-user-by-email");

export const getUserByUsername = db.query.users
   .findFirst({
      where: eq(users.username, sql.placeholder("username")),
   })
   .prepare("get-user-by-username");

export const getUserByResetPassword = db.query.users
   .findFirst({
      where: eq(users.resetPassword, sql.placeholder("resetPassword")),
   })
   .prepare("get-user-by-reset-password");
