import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  ACTIVITY_TYPES,
  PRIORITY,
  SCHEDULE_TYPES,
  STATUS,
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
  targetDays: text("target_days"),
  reminderTime: text("reminder_time"),

  dueDate: text("due_date"),
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

export const activityLogs = sqliteTable("activity_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  activityId: integer("activity_id")
    .notNull()
    .references(() => activities.id, { onDelete: "cascade" }),
  date: text("date").notNull(),
  status: text("status", { enum: STATUS }).notNull().default("done"),
  note: text("note"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const userProfile = sqliteTable("user_profile", {
  id: integer("id").primaryKey().default(1),
  name: text("name").notNull().default("Пользователь"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  activity: one(activities, {
    fields: [activityLogs.activityId],
    references: [activities.id],
  }),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  activities: many(activities),
}));

export const activitiesRelations = relations(activities, ({ one, many }) => ({
  category: one(categories, {
    fields: [activities.categoryId],
    references: [categories.id],
  }),
  logs: many(activityLogs),
}));

export type Activity = typeof activities.$inferSelect;
export type Category = typeof categories.$inferSelect;
