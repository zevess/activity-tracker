import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { lists } from "../schema";

export const listRepository = {
  getAll() {
    return db.select().from(lists).orderBy(desc(lists.id));
  },
  create(data: { name: string }) {
    return db.insert(lists).values(data);
  },
  remove(id: number) {
    return db.delete(lists).where(eq(lists.id, id));
  },
};
