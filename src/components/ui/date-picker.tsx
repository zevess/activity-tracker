import { useAppTheme } from "@/theme/theme-provider";
import { DatePicker } from "@quidone/react-native-wheel-picker";
import { View } from "react-native";
import { AppText } from "./app-text";

export type DatePickerProps = {
  label?: string;
  value: string;
  onChange: (date: string) => void;
};

export function DatePickerWrapper({ label, value, onChange }: DatePickerProps) {
  const { colors, spacing, radius } = useAppTheme();

  return (
    <View style={{ gap: spacing.sm }}>
      {label && <AppText variant="caption">{label}</AppText>}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <DatePicker
          locale="ru"
          date={value}
          onDateChanged={({ date }) => onChange(date)}
        />
      </View>
    </View>
  );
}
