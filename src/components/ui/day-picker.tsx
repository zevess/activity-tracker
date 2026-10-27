import { DayOption } from "@/data/types/days.types";
import { useAppTheme } from "@/theme/theme-provider";
import { Pressable, View } from "react-native";
import { AppText } from "./app-text";

export type DayPickerProps = {
  label?: string;
  options: DayOption[];
  values: number[];
  onChange: (days: number[]) => void;
  error?: string;
};

export function DayPicker({
  label,
  options,
  values,
  onChange,
  error,
}: DayPickerProps) {
  const { colors, spacing, radius } = useAppTheme();
  function toggleDay(day: number) {
    if (values.includes(day)) {
      onChange(values.filter((d) => d !== day));
    } else {
      onChange([...values, day].sort());
    }
  }
  return (
    <View style={{ gap: spacing.sm }}>
      <View>
        {label && <AppText variant="caption">{label}</AppText>}
        {error ? (
          <AppText variant="caption" tone="danger">
            {error}
          </AppText>
        ) : null}
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: spacing.md,
        }}
      >
        {options.map((day) => {
          const isActive = values.includes(day.value);
          return (
            <Pressable
              key={day.value}
              onPress={() => toggleDay(day.value)}
              style={{
                width: 50,
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: radius.pill,
                borderWidth: 1,
                borderColor: isActive ? colors.transparent : colors.border,
                backgroundColor: isActive ? colors.accent : colors.surface,
              }}
            >
              <AppText variant="caption">{day.label}</AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
