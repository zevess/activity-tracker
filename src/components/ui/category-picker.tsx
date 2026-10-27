import { CategoryOption } from "@/data/types/categories.types";
import { useAppTheme } from "@/theme/theme-provider";
import { Pressable, View } from "react-native";
import { AppText } from "./app-text";
import { CategoryChip } from "./category-chip";
import { IconName } from "./icon";

export type CategoryPickerProps = {
  label?: string;
  options: CategoryOption[];
  value?: number | null;
  onChange: (id: number) => void;
};

export function CategoryPicker({
  label,
  options,
  value,
  onChange,
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
          width: "100%",
        }}
      >
        {options.map((option) => {
          const isActive = value === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => onChange(option.id)}
              style={{
                width: "48%",
                flexGrow: 1,
              }}
            >
              <CategoryChip
                icon={option.icon as IconName}
                name={option.name}
                color={option.color}
                pressable
                isPressed={isActive}
                size="lg"
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
