import { IconName } from "@/components/ui/icon";

export type TabName = "index" | "activities" | "stats" | "settings";

export interface ITab {
  name: TabName;
  title: string;
  icon: IconName;
}


export const tabs: ITab[] = [
  {
    name: "index",
    icon: "today",
    title: "Сегодня",
  },
  {
    name: "activities",
    icon: "list",
    title: "Активности",
  },
  {
    name: "stats",
    icon: "stats-chart",
    title: "Статистика",
  },
  {
    name: "settings",
    icon: "settings",
    title: "Настройки",
  },
];
