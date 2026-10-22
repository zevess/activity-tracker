import { SelectOption } from "@/data/types/activities.types";
import { useAppTheme } from "@/theme/theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View } from "react-native";
import { AppText } from "./app-text";

type RadioButtonGroupProps<T extends string> = {
  label?: string;
  options: SelectOption<T>[];
  selectedOption: T;
  setSelectedOption: Dispatch<SetStateAction<T>>;
};

export function RadioButtonGroup<T extends string>({
  label,
  options,
  selectedOption,
  setSelectedOption,
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
        }}
      >
        {options.map((option) => {
          let active = selectedOption === option.value;
          return (
            <TouchableOpacity
              onPress={() => setSelectedOption(option.value)}
              key={option.value}
              style={{
                alignItems: "center",
                flexDirection: "row",
                padding: spacing.md,
                marginVertical: spacing.sm,
                backgroundColor: colors.surfaceStrong,
                borderRadius: radius.md,
                borderWidth: 1,
                borderColor: active ? colors.accent : "transparent",
                gap: spacing.sm,
              }}
            >
              <Ionicons
                size={spacing.xxl}
                color={colors.accent}
                name={active ? "radio-button-on" : "radio-button-off"}
              />
              <AppText variant="subtitle">{option.label}</AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
