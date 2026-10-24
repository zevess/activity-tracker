import { CategoryOption } from "@/data/types/categories.types";
import { useAppTheme } from "@/theme/theme-provider";
import { Pressable, View } from "react-native";
import { AppText } from "./app-text";
import { CategoryChip } from "./category-chip";
import { IconName } from "./icon";

export type CategoryPickerProps = {
  label?: string;
  options: CategoryOption[];
  selectedOption?: number;
  onSelectOption: (id: number) => void;
};

export function CategoryPicker({
  label,
  options,
  selectedOption,
  onSelectOption,
}: CategoryPickerProps) {
  const { colors, spacing, radius } = useAppTheme();
  return (
    <View style={{ gap: spacing.sm }}>
      {label && <AppText variant="caption">{label}</AppText>}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: spacing.md,
        }}
      >
        {options.map((option) => {
          let active = selectedOption === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => {
                console.log(option.id);
                onSelectOption(option.id);
              }}
              style={{
                width: "47%",
              }}
            >
              <CategoryChip
                icon={option.icon as IconName}
                name={option.name}
                color={option.color}
                pressable
                isPressed={active}
                size="lg"
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
