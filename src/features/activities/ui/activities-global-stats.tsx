import { AppText } from "@/components/ui/app-text";
import { StatusMessage } from "@/components/ui/status-message";
import { useGetGlobalStatistics } from "@/data/queries/activities/use-get-global-statistics";
import { useAppTheme } from "@/theme/theme-provider";
import { View } from "react-native";
import { StatCard } from "./stat-card";

export function ActivitiesGlobalStats() {
  const { colors, spacing, radius } = useAppTheme();
  const {
    globalStats,
    isGlobalStatsError,
    isGlobalStatsLoaded,
    isGlobalStatsLoading,
  } = useGetGlobalStatistics();
  if (isGlobalStatsLoading) {
    return <StatusMessage isLoading />;
  }
  if (globalStats?.activeHabitsCount === 0) {
    return <StatusMessage text="Добавьте привычки чтобы получить статистику" />;
  }
  return (
    <View style={{ gap: spacing.lg }}>
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        <StatCard
          icon="flame"
          label="Активных серий"
          value={globalStats?.currentActiveStreak}
          color={colors.citrus}
        />
        <StatCard
          icon="trophy"
          label="Лучшая серия"
          value={globalStats?.bestStreakOverall}
          color={colors.golden}
        />
      </View>
      <View style={{ flexDirection: "row", gap: spacing.sm }}>
        <StatCard
          icon="checkmark-circle"
          label="Всего выполнений"
          value={globalStats?.totalCompletions}
          color={colors.success}
        />
        <StatCard
          icon="trending-up"
          label="Успех за неделю"
          value={`${globalStats?.weeklyCompletionRate}%`}
          color={colors.info}
        />
      </View>
      {globalStats?.weeklyCompletionRate && (
        <View style={{ gap: spacing.xs }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <AppText variant="body" tone="muted">
              Прогресс недели
            </AppText>
            <AppText
              variant="body"
              style={{ fontWeight: "bold", color: colors.text }}
            >
              {globalStats?.weeklyCompletionRate}%
            </AppText>
          </View>
          <View
            style={{
              height: 8,
              backgroundColor: colors.border,
              borderRadius: radius.sm,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                width: `${Math.min(globalStats?.weeklyCompletionRate, 100)}%`,
                backgroundColor:
                  globalStats?.weeklyCompletionRate &&
                  globalStats.weeklyCompletionRate >= 80
                    ? "#22c55e"
                    : "#3b82f6",
                borderRadius: radius.sm,
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
