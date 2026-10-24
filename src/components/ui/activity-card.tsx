import { Activity } from "@/data/types/activities.types";
import { DEFAULT_CATEGORIES } from "@/data/types/categories.types";
import { useAppTheme } from "@/theme/theme-provider";
import { View } from "react-native";
import { AppText } from "./app-text";
import { Card } from "./card";
import { CategoryChip } from "./category-chip";

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const { colors } = useAppTheme();
  return (
    <Card style={{ backgroundColor: colors.surface }}>
      <AppText variant="subtitle">{activity.title}</AppText>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CategoryChip
          name={DEFAULT_CATEGORIES[0].name}
          icon={DEFAULT_CATEGORIES[0].icon}
          color={DEFAULT_CATEGORIES[0].color}
        />
      </View>
    </Card>
  );
}
