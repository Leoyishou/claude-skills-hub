import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Categories table for organizing skills
 */
export const categories = mysqlTable("categories", {
  id: varchar("id", { length: 64 }).primaryKey(),
  nameEn: varchar("nameEn", { length: 128 }).notNull(),
  nameZh: varchar("nameZh", { length: 128 }).notNull(),
  descEn: text("descEn"),
  descZh: text("descZh"),
  color: varchar("color", { length: 32 }),
  icon: varchar("icon", { length: 256 }),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

/**
 * Skills table for storing Claude skills
 */
export const skills = mysqlTable("skills", {
  id: varchar("id", { length: 64 }).primaryKey(),
  titleEn: varchar("titleEn", { length: 256 }).notNull(),
  titleZh: varchar("titleZh", { length: 256 }).notNull(),
  descriptionEn: text("descriptionEn"),
  descriptionZh: text("descriptionZh"),
  scenarioEn: text("scenarioEn"),
  scenarioZh: text("scenarioZh"),
  category: varchar("category", { length: 64 }).notNull(),
  tagsEn: json("tagsEn").$type<string[]>(),
  tagsZh: json("tagsZh").$type<string[]>(),
  source: mysqlEnum("source", ["official", "community"]).default("community").notNull(),
  author: varchar("author", { length: 128 }),
  url: varchar("url", { length: 512 }),
  isActive: boolean("isActive").default(true).notNull(),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Skill = typeof skills.$inferSelect;
export type InsertSkill = typeof skills.$inferInsert;
