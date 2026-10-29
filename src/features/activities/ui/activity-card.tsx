import { IconButton } from "@/components/ui/icon-button";
import { Activity } from "@/data/types/activities.types";
import { getConvertedDays, getFormatedDate } from "@/lib/date";
import { useAppTheme } from "@/theme/theme-provider";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Card } from "../../../components/ui/card";
import { IconName } from "../../../components/ui/icon";
import { CategoryChip } from "../../categories/ui/category-chip";

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const router = useRouter();
  const { colors, spacing } = useAppTheme();
  const filteredDays = getConvertedDays(
    Array.isArray(activity.targetDays) ? activity.targetDays : null,
  );
  const formatedDate = getFormatedDate(activity.dueDate ?? "");
  return (
    <Card style={{ backgroundColor: colors.surface }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <AppText variant="subtitle">{activity.title}</AppText>
        <IconButton
          onPress={() =>
            router.navigate({
              pathname: "/activity/[id]/edit",
              params: { id: activity.id },
            })
          }
          name="settings"
        />
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: spacing.sm,
            alignItems: "center",
          }}
        >
          <AppText variant="body">{activity.reminderTime}</AppText>
          <View
            style={{
              flexDirection: "row",
              gap: spacing.sm,
              alignItems: "center",
            }}
          >
            {filteredDays &&
              filteredDays.length < 7 &&
              filteredDays.map((day) => (
                <AppText tone="muted" key={day.value} variant="caption">
                  {day.label}
                </AppText>
              ))}
            {filteredDays && filteredDays.length == 7 && (
              <AppText tone="muted" variant="caption">
                Ежедневно
              </AppText>
            )}
            {formatedDate && (
              <AppText variant="caption">{formatedDate}</AppText>
            )}
          </View>
        </View>

        <CategoryChip
          name={activity.category?.name as string}
          icon={activity.category?.icon as IconName}
          color={activity.category?.color as string}
        />
      </View>
    </Card>
  );
}
