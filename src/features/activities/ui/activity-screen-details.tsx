import { AppText } from "@/components/ui/app-text";
import { Activity } from "@/data/types/activities.types";
import { CategoryChip } from "@/features/categories/ui/category-chip";
import { getConvertedDays, getFormatedDate } from "@/lib/date/date";
import { useAppTheme } from "@/theme/theme-provider";
import { View } from "react-native";
import { getFormatedPriority } from "../lib/get-formated-priority";

type ActivityScreenDetailsProps = {
  activity?: Activity | null;
};

export function ActivityScreenDetails({
  activity,
}: ActivityScreenDetailsProps) {
  const { spacing } = useAppTheme();
  const filteredDays = getConvertedDays(
    Array.isArray(activity?.targetDays) ? activity.targetDays : null,
  );
  const formatedDate = getFormatedDate(activity?.dueDate ?? "");
  const formatedPriority = getFormatedPriority(activity?.priority);
  return (
    <View
      style={{
        gap: spacing.xl,
        flex: 1,
      }}
    >
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
    </View>
  );
}
