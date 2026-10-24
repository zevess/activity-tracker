import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  ACTIVITY_TYPES,
  PRIORITY,
  SCHEDULE_TYPES,
} from "../types/activities.types";

export const activities = sqliteTable("activities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type", { enum: ACTIVITY_TYPES }).notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  isArchived: integer("is_archived", { mode: "boolean" })
    .notNull()
    .default(false),

  scheduleType: text("schedule_type", { enum: SCHEDULE_TYPES }),
  targetDays: text("targer_days"),
  reminderTime: text("reminder_time"),

  dueTime: text("due_time"),
  priority: text("priority", { enum: PRIORITY }),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  color: text("color").notNull(),
  icon: text("icon").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export type Activity = typeof activities.$inferSelect;
export type Category = typeof categories.$inferSelect;
