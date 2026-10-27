import { Activity } from "@/data/types/activities.types";
import { useAppTheme } from "@/theme/theme-provider";
import { View } from "react-native";
import { AppText } from "./app-text";
import { Card } from "./card";
import { CategoryChip } from "./category-chip";
import { IconName } from "./icon";

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
          name={activity.category?.name as string}
          icon={activity.category?.icon as IconName}
          color={activity.category?.color as string}
        />
      </View>
    </Card>
  );
}
