import { and, desc, eq, isNotNull, isNull, or } from "drizzle-orm";
import { db } from "../db";
import { activities } from "../db/schema";
import { CreateActivityInput } from "../types/activities.types";

export const activityRepository = {
  async getAll() {
    try {
      const rows = await db.query.activities.findMany({
        where: and(
          eq(activities.isArchived, false),
          isNull(activities.completedAt),
        ),
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
    } catch (error) {
      console.error(error);
    }
  },
  async getById(id: number) {
    try {
      const result = await db.query.activities.findFirst({
        where: eq(activities.id, id),
        with: {
          category: true,
        },
      });
      if (!result) {
        return null;
      }
      const transformed = {
        ...result,
        targetDays: result?.targetDays
          ? (JSON.parse(result.targetDays) as number[])
          : null,
      };
      return transformed;
    } catch (error) {
      console.error(error);
    }
  },
  async create(data: CreateActivityInput) {
    try {
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
    } catch (error) {
      console.error(error);
    }
  },

  async update(id: number, data: CreateActivityInput) {
    try {
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
    } catch (error) {
      console.error(error);
    }
  },

  async delete(id: number) {
    try {
      await db.delete(activities).where(eq(activities.id, id));
    } catch (error) {
      console.error(error);
    }
  },

  async markOneOffCompleted(id: number) {
    try {
      await db
        .update(activities)
        .set({
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(activities.id, id));
    } catch (error) {
      console.error(error);
    }
  },

  async unmarkOneOffCompleted(id: number) {
    try {
      await db
        .update(activities)
        .set({
          completedAt: null,
          updatedAt: new Date(),
        })
        .where(eq(activities.id, id));
    } catch (error) {
      console.error(error);
    }
  },

  async getCompleted() {
    try {
      const rows = await db.query.activities.findMany({
        where: or(
          eq(activities.isArchived, true),
          isNotNull(activities.completedAt),
        ),
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
    } catch (error) {
      console.error(error);
    }
  },
};
