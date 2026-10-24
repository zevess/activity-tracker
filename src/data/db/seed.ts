import { db } from ".";
import { DEFAULT_CATEGORIES } from "../types/categories.types";
import { categories } from "./schema";

export async function seedDatabase() {
  try {
    const existingCategories = await db.select().from(categories).limit(1);
    if (existingCategories.length === 0) {
      await db.insert(categories).values(DEFAULT_CATEGORIES);
    }
  } catch (error) {
    console.error("Error during seeding categories", error);
  }
}
