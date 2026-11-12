import { useAppTheme } from "@/theme/theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { SectionHeader } from "./section-header";

type CollapsibleProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function Collapsible({
  title,
  children,
  defaultOpen = false,
}: CollapsibleProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const { colors, radius, spacing } = useAppTheme();

  return (
    <View style={{ gap: spacing.sm, width: "100%" }}>
      <Pressable
        onPress={() => setOpen(!open)}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: spacing.sm,
          borderRadius: radius.md,
        }}
      >
        <SectionHeader title={title} />
        <Ionicons
          size={24}
          name={open ? "chevron-up" : "chevron-down"}
          color={colors.textMuted}
        />
      </Pressable>

      {open && (
        <View style={{ gap: spacing.md, width: "100%", marginTop: spacing.xs }}>
          {children}
        </View>
      )}
    </View>
  );
}
