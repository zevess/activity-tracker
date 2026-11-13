import { useGetActivityStatistics } from "@/data/queries/activities/use-get-activity-statistics";
import { useAppTheme } from "@/theme/theme-provider";
import { View } from "react-native";
import { StatCard } from "./stat-card";

export function ActivityStatistics({ activityId }: { activityId: number }) {
  const {
    statistics,
    isStatisticsError,
    isStatisticsLoaded,
    isStatisticsLoading,
  } = useGetActivityStatistics(activityId);
  const { colors, spacing, radius } = useAppTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        <StatCard
          color={colors.warning}
          icon="flame"
          value={`${statistics?.currentStreak} дн.`}
          label="Текущая серия"
        />
        <StatCard
          color={colors.golden}
          icon="trophy"
          value={`${statistics?.bestStreak} дн.`}
          label="Лучшая серия"
        />
      </View>
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        <StatCard
          color={colors.info}
          icon="calendar"
          value={`${statistics?.completionRateMonth}%`}
          label="За месяц"
        />
        <StatCard
          color={colors.accent}
          icon="checkmark-circle"
          value={`${statistics?.totalCompletions} дн.`}
          label="Всего выполнений"
        />
      </View>
    </View>
  );
}
