import { getMissedDays } from "@/utils/get-missed-days";
import { getNextHabitDueDate } from "@/utils/get-next-habit-due-date";
import { format, isBefore, subDays } from "date-fns";
import { and, desc, eq, gte, isNotNull, isNull, lt, or } from "drizzle-orm";
import { db } from "../db";
import { activities, activityLogs } from "../db/schema";
import { CreateActivityInput } from "../types/activities.types";

export const activityRepository = {
  async getAll() {
    try {
      const allActivities = await db.query.activities.findMany({
        where: and(
          eq(activities.isArchived, false),
          isNull(activities.completedAt),
        ),
        orderBy: [desc(activities.createdAt)],
        with: {
          category: true,
        },
      });
      return allActivities.map((activity) => ({
        ...activity,
        targetDays: activity.targetDays
          ? (JSON.parse(activity.targetDays) as number[])
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
      await db
        .update(activities)
        .set({
          isArchived: true,
          archivedAt: new Date(),
          completedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(activities.id, id));
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

  async getArchived() {
    try {
      const archivedActivities = await db.query.activities.findMany({
        where: or(
          eq(activities.isArchived, true),
          isNotNull(activities.completedAt),
        ),
        with: {
          category: true,
        },
      });
      return archivedActivities.map((activity) => ({
        ...activity,
        targetDays: activity.targetDays
          ? (JSON.parse(activity.targetDays) as number[])
          : null,
      }));
    } catch (error) {
      console.error(error);
    }
  },

  async getCompletedToday() {
    try {
      const now = new Date();
      const todayStr = format(now, "yyyy-MM-dd");
      const allActivities = await db.query.activities.findMany({
        where: eq(activities.isArchived, false),
        with: {
          category: true,
        },
      });
      const todayLogs = await db
        .select({ activityId: activityLogs.activityId })
        .from(activityLogs)
        .where(
          and(eq(activityLogs.date, todayStr), eq(activityLogs.status, "done")),
        );
      const completedTodayIds = new Set(todayLogs.map((log) => log.activityId));
      const enriched = allActivities.filter((activity) =>
        completedTodayIds.has(activity.id),
      );
      return enriched.map((row) => ({
        ...row,
        targetDays: row.targetDays
          ? (JSON.parse(row.targetDays) as number[])
          : null,
        isCompletedToday: true,
      }));
    } catch (error) {
      console.error(error);
    }
  },

  async getUpcoming(limit: number = 5) {
    try {
      const now = new Date();
      const todayStr = format(now, "yyyy-MM-dd");

      const todayLogs = await db
        .select({ activityId: activityLogs.activityId })
        .from(activityLogs)
        .where(
          and(eq(activityLogs.date, todayStr), eq(activityLogs.status, "done")),
        );
      const completedTodayIds = new Set(todayLogs.map((log) => log.activityId));

      const allActivities = await db.query.activities.findMany({
        where: and(
          eq(activities.isArchived, false),
          isNull(activities.completedAt),
        ),
        with: {
          category: true,
        },
      });

      const enriched = allActivities
        .map((activity) => {
          let nextDueDate: Date;
          let isOverdue = false;

          if (activity.type === "one_off") {
            if (activity.completedAt) return null;
            if (activity.dueDate) {
              const [y, m, d] = activity.dueDate.split("-").map(Number);
              const [h = 23, min = 59] = (activity.reminderTime || "23:59")
                .split(":")
                .map(Number);
              nextDueDate = new Date(y, m - 1, d, h, min);
              isOverdue = isBefore(nextDueDate, now);
            } else {
              nextDueDate = new Date(9999, 11, 31, 23, 59);
            }
          } else {
            if (completedTodayIds.has(activity.id)) return null;

            const targetDays = activity.targetDays
              ? (JSON.parse(activity.targetDays) as number[])
              : [];

            nextDueDate = getNextHabitDueDate({
              targetDays,
              reminderTime: activity.reminderTime,
              isCompletedToday: false,
              now,
            });

            isOverdue = false;
          }
          return {
            ...activity,
            targetDays: activity.targetDays
              ? (JSON.parse(activity.targetDays) as number[])
              : null,
            nextDueDate,
            isOverdue,
          };
        })
        .filter((a): a is NonNullable<typeof a> => a !== null);

      enriched.sort((a, b) => {
        if (a.isOverdue !== b.isOverdue) {
          return a.isOverdue ? -1 : 1;
        }
        return a.nextDueDate.getTime() - b.nextDueDate.getTime();
      });
      return enriched.slice(0, limit);
    } catch (error) {
      console.error(error);
    }
  },

  async getMissed(limit: number = 10) {
    try {
      const now = new Date();
      const weekAgo = subDays(now, 7);
      const habits = await db.query.activities.findMany({
        where: and(
          eq(activities.isArchived, false),
          eq(activities.type, "habit"),
        ),
        with: {
          category: true,
        },
      });

      const recentLogs = await db
        .select({
          activityId: activityLogs.activityId,
          date: activityLogs.date,
        })
        .from(activityLogs)
        .where(
          and(
            eq(activityLogs.status, "done"),
            gte(activityLogs.date, format(weekAgo, "yyyy-MM-dd")),
            lt(activityLogs.date, format(now, "yyyy-MM-dd")),
          ),
        );

      const logsByActivity = new Map<number, string[]>();
      recentLogs.forEach((log) => {
        const existing = logsByActivity.get(log.activityId) || [];
        existing.push(log.date);
        logsByActivity.set(log.activityId, existing);
      });

      const missedHabits = habits
        .map((habit) => {
          const targetDays = habit.targetDays
            ? (JSON.parse(habit.targetDays) as number[])
            : [];
          const completedDates = logsByActivity.get(habit.id) || [];

          const { count, lastMissedDate } = getMissedDays({
            targetDays,
            createdAt: habit.createdAt,
            completedDates,
            now,
          });

          if (count > 0) {
            return {
              ...habit,
              targetDays,
              missedCount: count,
              lastMissedDate,
            };
          }
          return null;
        })
        .filter((h): h is NonNullable<typeof h> => h !== null);

      missedHabits.sort((a, b) => b.missedCount - a.missedCount);

      return missedHabits.slice(0, limit);
    } catch (error) {
      console.error(error);
    }
  },
};
