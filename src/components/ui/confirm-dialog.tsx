import { useAppTheme } from "@/theme/theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "./app-text";
import { Button } from "./button";

type ConfirmDialogProps = {
  open?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
};

export function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  title = "Вы уверены?",
  message,
  confirmText = "Подтвердить",
  cancelText = "Отмена",
  variant = "danger",
  isLoading = false,
}: ConfirmDialogProps) {
  const { colors, radius, spacing } = useAppTheme();

  const iconConfig = {
    danger: {
      name: "alert-circle" as const,
      color: colors.danger,
    },
    warning: {
      name: "warning" as const,
      color: colors.golden,
    },
    info: {
      name: "information-circle" as const,
      color: colors.accent,
    },
  }[variant];

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <Pressable style={StyleSheet.absoluteFill} onPress={onCancel}>
        <View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        />
      </Pressable>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: spacing.lg,
        }}
        pointerEvents="box-none"
      >
        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: radius.xl,
            padding: spacing.lg,
            width: "100%",
            maxWidth: 400,
            gap: spacing.md,
          }}
        >
          <View style={{ alignItems: "center", gap: spacing.sm }}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: radius.lg,
                backgroundColor: iconConfig.color + "20",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={iconConfig.name}
                size={28}
                color={iconConfig.color}
              />
            </View>
            <AppText variant="title" style={{ textAlign: "center" }}>
              {title}
            </AppText>
            {message && (
              <AppText
                variant="body"
                tone="muted"
                style={{ textAlign: "center" }}
              >
                {message}
              </AppText>
            )}
          </View>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <Button
              label={cancelText}
              style={{ flex: 1 }}
              variant="secondary"
              onPress={onCancel}
              disabled={isLoading}
            />
            <Button
              label={confirmText}
              style={{ flex: 1 }}
              variant={variant == "danger" ? "danger" : "primary"}
              onPress={onConfirm}
              disabled={isLoading}
              loading={isLoading}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
