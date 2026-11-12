import { AppText } from "@/components/ui/app-text";
import { Activity } from "@/data/types/activities.types";
import { useAppTheme } from "@/theme/theme-provider";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { View } from "react-native";
import { ActivityCard } from "./activity-card";

type MissedActivitiesProps = {
  missedActivities: Activity[];
};

export function MissedActivities({ missedActivities }: MissedActivitiesProps) {
  const { spacing, colors, radius } = useAppTheme();
  return (
    <View style={{ gap: spacing.md }}>
      {missedActivities.map((activity) => (
        <View key={activity.id} style={{ gap: spacing.md }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                padding: spacing.sm,
                borderRadius: radius.md,
                borderColor: colors.danger,
                borderWidth: 1,
                backgroundColor: colors.dangerSoft,
              }}
            >
              <AppText tone="danger">Пропущено: {activity.missedCount}</AppText>
            </View>
            {activity.lastMissedDate && (
              <AppText>
                Последний пропуск:{" "}
                {format(activity.lastMissedDate, "d MMM", { locale: ru })}
              </AppText>
            )}
          </View>
          <ActivityCard key={activity.id} activity={activity} />
        </View>
      ))}
    </View>
  );
}
