import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { activities } from "../db/schema";
import { CreateActivityInput } from "../types/activities.types";

export const activityRepository = {
  async getAll() {
    return db.select().from(activities).orderBy(desc(activities.createdAt));
  },
  async getById(id: number) {
    const result = await db
      .select()
      .from(activities)
      .where(eq(activities.id, id))
      .limit(1);
    return result[0] ?? null;
  },
  async create(data: CreateActivityInput) {
    const result = await db
      .insert(activities)
      .values({
        title: data.title,
        description: data.description ?? null,
        type: data.type,
        categoryId: data.categoryId ?? null,

        scheduleType: data.type === "habit" ? data.scheduleType : null,
        targetDays:
          data.type === "habit" && data.targetDays
            ? JSON.stringify(data.targetDays)
            : null,
        reminderTime:
          data.type === "habit" ? (data.reminderTime ?? null) : null,

        dueTime: data.type === "one_off" ? (data.dueTime ?? null) : null,
        priority: data.type === "one_off" ? (data.priority ?? "medium") : null,
      })
      .returning();
    return result[0];
  },
  // async update(id: number, data: Partial<Activity>) {
  //   const result = await db
  //     .update(activities)
  //     .set(data)
  //     .where(eq(activities.id, id))
  //     .returning();
  //   return result[0];
  // },
  async delete(id: number) {
    await db.delete(activities).where(eq(activities.id, id));
  },
};
