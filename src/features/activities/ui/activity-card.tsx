import { Activity } from "@/data/types/activities.types";
import { useAppTheme } from "@/theme/theme-provider";
import { getConvertedDays, getFormatedDate } from "@/utils/date";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { Card } from "../../../components/ui/card";
import { CategoryChip } from "../../categories/ui/category-chip";

type ActivityCardProps = {
  activity: Activity;
};

export function ActivityCard({ activity }: ActivityCardProps) {
  const router = useRouter();
  const { colors, spacing, motion } = useAppTheme();
  const filteredDays = getConvertedDays(
    Array.isArray(activity.targetDays) ? activity.targetDays : null,
  );
  const formatedDate = getFormatedDate(activity.dueDate ?? "");
  return (
    <Pressable
      onPress={() =>
        router.navigate({
          pathname: "/activity/[id]",
          params: { id: activity.id },
        })
      }
      style={({ pressed }) => [
        {
          opacity: pressed ? motion.opacity.pressed : 1,
        },
      ]}
    >
      <Card
        style={{
          backgroundColor: colors.surface,
          opacity: activity.isCompletedToday ? 0.6 : 1,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <AppText variant="subtitle">{activity.title}</AppText>
          {activity.isCompletedToday && (
            <Ionicons
              size={spacing.lg}
              name="checkmark"
              color={colors.success}
            />
          )}
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
          {activity.category && (
            <CategoryChip
              name={activity.category?.name}
              icon={activity.category?.icon}
              color={activity.category?.color}
            />
          )}
        </View>
      </Card>
    </Pressable>
  );
}
