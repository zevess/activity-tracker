import { AppToaster } from "@/components/ui/app-toaster";
import { AppProviders } from "@/providers/app-provider";
import { NotificationProvider } from "@/providers/notification-provider";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <NotificationProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProviders>
          <Stack screenOptions={{ headerShown: false }} />
          <AppToaster />
        </AppProviders>
      </GestureHandlerRootView>
    </NotificationProvider>
  );
}
