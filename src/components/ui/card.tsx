import { useAppTheme } from "@/theme/theme-provider";
import { Pressable, View, ViewProps, ViewStyle } from "react-native";

type CardProps = ViewProps & {
  onPress?: () => void;
};

export function Card({ onPress, style, ...props }: CardProps) {
  const { colors, spacing, radius } = useAppTheme();
  const isInteractive = !!onPress;

  const baseStyle: ViewStyle = {
    gap: spacing.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.lg,
    backgroundColor: colors.surface,
  };

  if (isInteractive) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          baseStyle,
          pressed && { backgroundColor: colors.surfaceStrong },
          style,
        ]}
        {...props}
      />
    );
  }

  return <View style={[baseStyle, style]} {...props} />;
}
