import { Activity } from "@/data/types/activities.types";
import * as Notifications from "expo-notifications";

function isoToExpoWeekDay(isoDay: number) {
  return isoDay === 7 ? 1 : isoDay + 1;
}

export async function scheduleActivityNotification(activity: Activity) {
  const notificationId = `activity_reminder_${activity.id}`;

  await Notifications.cancelScheduledNotificationAsync(notificationId);

  if (!activity.reminderTime || activity.isArchived) {
    return;
  }

  const [hours, minutes] = activity.reminderTime.split(":").map(Number);

  let trigger: Notifications.NotificationTriggerInput;

  if (activity.type === "one_off") {
    if (!activity.dueDate) return;

    const [y, m, d] = activity.dueDate.split("-").map(Number);
    trigger = {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      year: y,
      month: m,
      day: d,
      hour: hours,
      minute: minutes,
      repeats: false,
    };
  } else {
    if (activity.scheduleType === "daily") {
      trigger = {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        hour: hours,
        minute: minutes,
        repeats: true,
      };
    } else {
      const targetDays = activity.targetDays || [1, 2, 3, 4, 5, 6, 7];

      for (const isoDay of targetDays) {
        const expoWeekDay = isoToExpoWeekDay(Number(isoDay));
        const customId = `${notificationId}_day_${isoDay}`;

        await Notifications.cancelScheduledNotificationAsync(customId);

        await Notifications.scheduleNotificationAsync({
          identifier: customId,
          content: {
            title: "Время привычки! ⏰",
            body: `Пора выполнить: ${activity.title}`,
            data: {
              activityId: activity.id,
            },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            weekday: expoWeekDay,
            hour: hours,
            minute: minutes,
            repeats: true,
          },
        });
      }
      return;
    }
  }

  await Notifications.scheduleNotificationAsync({
    identifier: notificationId,
    content: {
      title: "Время привычки! ⏰",
      body: `Пора выполнить: ${activity.title}`,
      data: {
        activityId: activity.id,
      },
    },
    trigger,
  });
}

export async function cancelActivityNotifications(activityId: number) {
  const baseId = `activity_reminder_${activityId}`;
  await Notifications.cancelScheduledNotificationAsync(baseId);

  for (let i = 1; i <= 7; i++) {
    await Notifications.cancelScheduledNotificationAsync(`${baseId}_day_${i}`);
  }
}
