import { format } from "date-fns";
import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { activityLogs } from "../db/schema";

export const activityLogsRepository = {
  async getStatus(activiyId: number, date: Date) {
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const result = await db
        .select({ status: activityLogs.status })
        .from(activityLogs)
        .where(
          and(
            eq(activityLogs.activityId, activiyId),
            eq(activityLogs.date, dateStr),
          ),
        )
        .limit(1);
      return result[0]?.status ?? null;
    } catch (error) {
      console.error(error);
    }
  },

  async getByActivity(activityId: number) {
    try {
      const result = await db
        .select()
        .from(activityLogs)
        .where(eq(activityLogs.activityId, activityId))
        .orderBy(activityLogs.date);
      return result;
    } catch (error) {
      console.error(error);
    }
  },

  async markDone(activityId: number, date: Date = new Date()) {
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      const existingLog = await this.getStatus(activityId, date);
      if (existingLog === "done") return null;

      if (existingLog) {
        const result = await db
          .update(activityLogs)
          .set({
            status: "done",
            createdAt: new Date(),
          })
          .where(
            and(
              eq(activityLogs.id, activityId),
              eq(activityLogs.date, dateStr),
            ),
          )
          .returning();
        return result[0];
      }
      const result = await db
        .insert(activityLogs)
        .values({
          activityId,
          date: dateStr,
          status: "done",
        })
        .returning();
      return result[0];
    } catch (error) {
      console.error(error);
    }
  },

  async undo(activityId: number, date: Date = new Date()) {
    try {
      const dateStr = format(date, "yyyy-MM-dd");
      await db
        .delete(activityLogs)
        .where(
          and(eq(activityLogs.id, activityId), eq(activityLogs.date, dateStr)),
        );
    } catch (error) {
      console.error(error);
    }
  },
};
