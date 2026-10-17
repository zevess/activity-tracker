import { useAppTheme } from "@/theme/theme-provider";
import { ScrollView, StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenProps = {
  children: React.ReactNode;
  contentStyle?: StyleProp<ViewStyle>;
  scroll?: boolean;
};

export function Screen({ children, contentStyle, scroll = true }: ScreenProps) {
  const { colors, spacing } = useAppTheme();
  const insets = useSafeAreaInsets();
  const baseContentStyles = [
    {
      flexGrow: 1,
      gap: spacing.lg,
      padding: spacing.xl,
      paddingTop: Math.max(insets.top + spacing.md, spacing.xl),
      paddingBottom: Math.max(insets.bottom + spacing.xl, spacing.xl),
    },
    contentStyle,
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {scroll ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={baseContentStyles}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, ...baseContentStyles]}>{children}</View>
      )}
    </View>
  );
}
