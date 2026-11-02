import { AppText } from "@/components/ui/app-text";
import { BackButton } from "@/components/ui/back-button";
import { EditButton } from "@/components/ui/edit-icon";
import { Screen } from "@/components/ui/screen";
import { useGetActivityById } from "@/data/queries/activities.queries";
import { getFormatedPriority } from "@/features/activities/lib/get-formated-priority";
import { getFormatedType } from "@/features/activities/lib/get-formated-type";
import { CategoryChip } from "@/features/categories/ui/category-chip";
import { getConvertedDays, getFormatedDate } from "@/lib/date/date";
import { useAppTheme } from "@/theme/theme-provider";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function ActivityScreen() {
  const { colors, spacing, radius } = useAppTheme();
  const { id } = useLocalSearchParams();
  const activityId = Number(id);
  const { activity, isActivityLoading } = useGetActivityById(activityId);

  if (isActivityLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  const activityType = getFormatedType(activity?.type);
  const filteredDays = getConvertedDays(
    Array.isArray(activity?.targetDays) ? activity.targetDays : null,
  );
  const formatedDate = getFormatedDate(activity?.dueDate ?? "");
  const formatedPriority = getFormatedPriority(activity?.priority);

  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BackButton />

        <AppText variant="title">{activityType?.label}</AppText>

        <EditButton id={activityId} />
      </View>
      <View style={{ alignItems: "center" }}>
        {activity?.category && (
          <CategoryChip
            size="lg"
            name={activity.category.name}
            icon={activity.category.icon}
            color={activity.category.color}
          />
        )}
      </View>
      <View
        style={{
          gap: spacing.xl,
        }}
      >
        <AppText variant="hero">{activity?.title}</AppText>
        {activity?.description && (
          <AppText variant="subtitle">{activity?.description}</AppText>
        )}

        {activity?.reminderTime && (
          <View>
            <AppText variant="caption" tone="muted">
              Время
            </AppText>
            <AppText variant="title">{activity?.reminderTime}</AppText>
          </View>
        )}

        {activity?.dueDate && (
          <View>
            <AppText variant="caption" tone="muted">
              Дата
            </AppText>
            <AppText variant="title">{formatedDate}</AppText>
          </View>
        )}

        {filteredDays && (
          <View>
            <AppText variant="caption" tone="muted">
              Расписание
            </AppText>
            <View style={{ flexDirection: "row", gap: spacing.md }}>
              {filteredDays.length < 7 &&
                filteredDays.map((day) => (
                  <AppText key={day.value} variant="title">
                    {day.label}
                  </AppText>
                ))}
              {filteredDays && filteredDays.length == 7 && (
                <AppText variant="title">Ежедневно</AppText>
              )}
            </View>
          </View>
        )}
        {activity?.priority && (
          <View>
            <AppText variant="caption" tone="muted">
              Приоритет
            </AppText>
            <AppText variant="title">{formatedPriority?.label}</AppText>
          </View>
        )}
      </View>
    </Screen>
  );
}
