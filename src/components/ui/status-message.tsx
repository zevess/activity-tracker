import { ActivityIndicator, View } from "react-native";
import { AppText } from "./app-text";

type StatusMessageProps = {
  text?: string;
  isLoading?: boolean;
  fullScreen?: boolean;
};

export function StatusMessage({
  text,
  isLoading,
  fullScreen = true,
}: StatusMessageProps) {
  return (
    <View
      style={
        fullScreen && {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }
      }
    >
      {text && (
        <AppText variant="title" tone="muted">
          {text}
        </AppText>
      )}
      {isLoading && <ActivityIndicator size="large" />}
    </View>
  );
}
