import { eq } from "drizzle-orm";
import { db } from "../db";
import { userProfile } from "../db/schema";

export const userRepository = {
  async getProfile() {
    try {
      const result = await db.select().from(userProfile).limit(1);
      return result[0] ?? null;
    } catch (error) {
      console.error(error);
    }
  },
  async updateProfile(name: string) {
    try {
      const existing = await this.getProfile();
      if (existing?.id) {
        await db
          .update(userProfile)
          .set({ name, updatedAt: new Date() })
          .where(eq(userProfile.id, existing.id));
      } else {
        await db.insert(userProfile).values({ id: 1, name });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
