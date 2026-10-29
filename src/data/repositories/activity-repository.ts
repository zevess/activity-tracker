import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { activities } from "../db/schema";
import { CreateActivityInput } from "../types/activities.types";

export const activityRepository = {
  async getAll() {
    const rows = await db.query.activities.findMany({
      where: eq(activities.isArchived, false),
      orderBy: [desc(activities.createdAt)],
      with: {
        category: true,
      },
    });
    return rows.map((row) => ({
      ...row,
      targetDays: row.targetDays
        ? (JSON.parse(row.targetDays) as number[])
        : null,
    }));
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

        scheduleType: data.scheduleType ?? null,
        targetDays:
          data.targetDays && data.targetDays.length > 0
            ? JSON.stringify(data.targetDays)
            : null,
        reminderTime: data.reminderTime ?? null,

        dueDate: data.dueDate ?? null,
        priority: data.priority ?? null,
      })
      .returning();
    return result[0];
  },

  async update(id: number, data: CreateActivityInput) {
    const result = await db
      .update(activities)
      .set({
        title: data.title,
        description: data.description ?? null,
        type: data.type,
        categoryId: data.categoryId ?? null,

        scheduleType: data.scheduleType ?? null,
        targetDays:
          data.targetDays && data.targetDays.length > 0
            ? JSON.stringify(data.targetDays)
            : null,
        reminderTime: data.reminderTime ?? null,

        dueDate: data.dueDate ?? null,
        priority: data.priority ?? null,
        updatedAt: new Date(),
      })
      .where(eq(activities.id, id))
      .returning();
    return result[0];
  },

  async delete(id: number) {
    await db.delete(activities).where(eq(activities.id, id));
  },
};
