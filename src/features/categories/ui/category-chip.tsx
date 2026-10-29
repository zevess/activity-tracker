import { useAppTheme } from "@/theme/theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, ViewStyle } from "react-native";
import { AppText } from "../../../components/ui/app-text";
import { IconName } from "../../../components/ui/icon";

type CategoryChipProps = {
  name: string;
  icon: IconName;
  color: string;
  size?: "sm" | "md" | "lg";
  pressable?: boolean;
  isPressed?: boolean;
};

export function CategoryChip({
  name,
  icon,
  color,
  size = "sm",
  pressable = false,
  isPressed = false,
}: CategoryChipProps) {
  const { spacing, radius, colors } = useAppTheme();
  const chipIconSize =
    size === "md" ? spacing.xl : size === "lg" ? spacing.xxl : spacing.lg;
  const chipTextSize =
    size === "md" ? "body" : size === "lg" ? "subtitle" : "caption";
  const defaultStyles: ViewStyle = {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    backgroundColor: color,
    borderRadius: radius.xl,
  };

  const pressableStyles: ViewStyle = {
    alignItems: "center",
    flexDirection: "row",
    padding: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
    backgroundColor: isPressed ? color : colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: isPressed ? "transparent" : colors.border,
  };
  return (
    <View style={pressable ? pressableStyles : defaultStyles}>
      <Ionicons name={icon} size={chipIconSize} color={`${colors.text}/30`} />
      <AppText variant={chipTextSize}>{name}</AppText>
    </View>
  );
}
