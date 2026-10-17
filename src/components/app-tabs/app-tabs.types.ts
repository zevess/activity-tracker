import Ionicons from "@expo/vector-icons/Ionicons";

export type IconName = keyof typeof Ionicons.glyphMap;
export type TabName = "index" | "activities" | "stats" | "settings";

export interface ITab {
  name: TabName;
  title: string;
  icon: IconName;
}
