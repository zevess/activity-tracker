import { IconName } from "../ui/icon";
export type TabName = "index" | "activities" | "stats" | "settings";

export interface ITab {
  name: TabName;
  title: string;
  icon: IconName;
}
