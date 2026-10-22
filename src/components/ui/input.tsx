import { useAppTheme } from "@/theme/theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TextInput, TextInputProps, View } from "react-native";
import { AppText } from "./app-text";
import { IconName } from "./icon";

type InputProps = TextInputProps & {
  label?: string;
  variant?: "default" | "filled" | "quiet";
  size?: "sm" | "md" | "lg";
  leftIcon?: IconName;
  rightIcon?: IconName;
  error?: string;
};

export function Input({
  label,
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  error,
  style,
  ...props
}: InputProps) {
  const { colors, radius, spacing } = useAppTheme();
  const isQuiet = variant === "quiet";
  const inputHeight = size === "md" ? 44 : size === "lg" ? 60 : 52;
  const inputFontSize = size === "md" ? 16 : size === "lg" ? 20 : 14;
  const inputFontWeight = size === "md" ? "600" : size === "lg" ? "800" : "400";
  return (
    <View style={{ gap: spacing.sm }}>
      {label ? <AppText variant="caption">{label}</AppText> : null}
      <View
        style={[
          {
            minHeight: inputHeight,
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.sm,
            borderWidth: 1,
            borderColor: error
              ? colors.danger
              : isQuiet
                ? "trasparent"
                : colors.border,
            borderRadius: radius.lg,
            paddingHorizontal: spacing.lg,
            backgroundColor:
              variant === "filled" ? colors.surfaceStrong : colors.surface,
          },
        ]}
      >
        {leftIcon ? (
          <Ionicons name={leftIcon} size={18} color={colors.textMuted} />
        ) : null}
        <TextInput
          placeholderTextColor={colors.textMuted}
          style={[
            {
              flex: 1,
              minHeight: inputHeight - 2,
              color: colors.text,
              fontSize: inputFontSize,
              fontWeight: inputFontWeight,
              // fontSize: size === "sm" ? 14 : 15,
            },
            style,
          ]}
          {...props}
        />
        {rightIcon ? (
          <Ionicons name={rightIcon} size={18} color={colors.textMuted} />
        ) : null}
        {error ? (
          <AppText variant="caption" tone="danger">
            {error}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}
