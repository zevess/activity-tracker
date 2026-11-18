import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const responseListener = useRef<Notifications.EventSubscription | undefined>(
    undefined,
  );

  useEffect(() => {
    Notifications.requestPermissionsAsync();

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    const notificationResponse = Notifications.getLastNotificationResponse();
    if (notificationResponse?.notification.request.content.data?.activityId) {
      const id =
        notificationResponse.notification.request.content.data.activityId;
      router.push(`/activity/${id}`);
    }
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const activityId =
          response.notification.request.content.data?.activityId;
        if (activityId) {
          router.push(`/activity/${activityId}`);
        }
      });

    return () => {
      responseListener.current?.remove();
    };
  }, [router]);
  return <>{children}</>;
}
