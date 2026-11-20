import { View, ViewStyle } from "react-native";
import { AppText } from "./app-text";
import { BackButton } from "./back-button";

export function ScreenTitle({
  title,
  withBack = false,
  variant = "hero",
  style,
  children,
}: {
  title: string;
  withBack?: boolean;
  variant?: "hero" | "title";
  style?: ViewStyle;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: children ? "space-between" : "flex-start",
          alignItems: "center",
          gap: children ? 0 : 24,
        },
        style,
      ]}
    >
      {withBack && <BackButton />}
      <AppText variant={variant}>{title}</AppText>
      {children}
    </View>
  );
}
{
  /* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 24,
        }}
      >
        <BackButton />
        <AppText variant="title">Архив</AppText>
      </View> */
}
