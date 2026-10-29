import { CategoryOption } from "@/data/types/categories.types";

export function getDefaultCategory(categories?: CategoryOption[]) {
  const defaultCategory =
    categories &&
    categories.find(
      (category) => category.name.toLocaleLowerCase() === "другое",
    );
  return defaultCategory;
}
