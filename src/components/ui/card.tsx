import { useAppTheme } from "@/theme/theme-provider";
import { View, ViewProps } from "react-native";

export function Card({ style, ...props }: ViewProps) {
  const { colors, spacing, radius } = useAppTheme();

  return (
    <View
      style={[
        {
          gap: spacing.md,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.xl,
          padding: spacing.lg,
          backgroundColor: colors.surface,
        },
        style,
      ]}
      {...props}
    />
  );
}
