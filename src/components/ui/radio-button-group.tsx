import { SelectOption } from "@/data/types/activities.types";
import { useAppTheme } from "@/theme/theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "./app-text";

type RadioButtonGroupProps<T extends string> = {
  label?: string;
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
};

export function RadioButtonGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: RadioButtonGroupProps<T>) {
  const { colors, spacing, radius } = useAppTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      {label ? <AppText variant="caption">{label}</AppText> : null}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
          gap: spacing.md,
        }}
      >
        {options.map((option) => {
          const isActive = value === option.value;
          return (
            <TouchableOpacity
              onPress={() => onChange(option.value)}
              key={option.value}
              style={{
                flexGrow: 1,
                maxWidth: "48%",
                alignItems: "center",
                flexDirection: "row",
                paddingVertical: spacing.lg,
                paddingHorizontal: spacing.md,
                backgroundColor: colors.surface,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: isActive ? colors.accent : colors.border,
                gap: spacing.sm,
              }}
            >
              <Ionicons
                size={spacing.xl}
                color={isActive ? colors.accent : colors.border}
                name={isActive ? "radio-button-on" : "radio-button-off"}
              />
              <AppText variant="subtitle">{option.label}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
