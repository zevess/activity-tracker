import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { activities, categories } from "../db/schema";

export const categoryRepository = {
  async getAll() {
    return db.select().from(categories).orderBy(desc(categories));
  },
  async getById(id: number) {
    const result = await db
      .select()
      .from(categories)
      .where(eq(categories.id, id))
      .limit(1);
    return result[0] ?? null;
  },
  //   async create(data: CreateActivityInput) {
  //     const result = await db
  //       .insert(categories)
  //       .values({

  //       })
  //       .returning();
  //     return result[0];
  //   },
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
