import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { tasks } from "../schema";

export const taskRepository = {
  getAll() {
    return db.select().from(tasks).orderBy(desc(tasks.id));
  },
  create(data: { name: string; list_id: number }) {
    return db.insert(tasks).values(data);
  },
  remove(id: number) {
    return db.delete(tasks).where(eq(tasks.id, id));
  },
};
