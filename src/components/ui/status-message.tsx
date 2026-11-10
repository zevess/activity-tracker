import { ActivityIndicator, View } from "react-native";
import { AppText } from "./app-text";

type StatusMessageProps = {
  text?: string;
  isLoading?: boolean;
};

export function StatusMessage({ text, isLoading }: StatusMessageProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {text && (
        <AppText variant="title" tone="muted">
          {text}
        </AppText>
      )}
      {isLoading && <ActivityIndicator size="large" />}
    </View>
  );
}
