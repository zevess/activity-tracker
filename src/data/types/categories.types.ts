import { IconName } from "@/components/ui/icon";

export type Category = {
  name: string;
  color: string;
  icon: IconName | string;
};

export type CategoryOption = Category & {
  id: number;
};

export const DEFAULT_CATEGORIES: Category[] = [
  {
    name: "Здоровье",
    color: "#D1FAE5",
    icon: "heart",
  },
  {
    name: "Учеба",
    color: "#E9D5FF",
    icon: "book",
  },
  {
    name: "Работа",
    color: "#FED7AA",
    icon: "briefcase",
  },
  {
    name: "Финансы",
    color: "#FEF9C3",
    icon: "wallet",
  },
  {
    name: "Дом",
    color: "#CFFAFE",
    icon: "home",
  },
  {
    name: "Другое",
    color: "#F3F4F6",
    icon: "ellipse",
  },
] as const;
