import { Activity } from "@/data/types/activities.types";
import * as Notifications from "expo-notifications";

function isoToExpoWeekDay(isoDay: number): number {
  return isoDay === 7 ? 1 : isoDay + 1;
}

export async function scheduleActivityNotification(activity: Activity) {
  const baseId = `activity_reminder_${activity.id}`;

  await cancelActivityNotifications(activity.id);

  if (!activity.reminderTime || activity.isArchived) {
    return;
  }

  const [hours, minutes] = activity.reminderTime.split(":").map(Number);

  if (activity.type === "one_off") {
    if (!activity.dueDate) return;

    const [y, m, d] = activity.dueDate.split("-").map(Number);
    const dueDateTime = new Date(y, m - 1, d, hours, minutes);

    if (dueDateTime.getTime() < Date.now()) return;

    await Notifications.scheduleNotificationAsync({
      identifier: baseId,
      content: {
        title: "Время задачи! ⏰",
        body: `Пора выполнить: ${activity.title}`,
        data: {
          activityId: activity.id,
        },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: dueDateTime,
      },
    });
  } else {
    if (activity.scheduleType === "daily") {
      await Notifications.scheduleNotificationAsync({
        identifier: baseId,
        content: {
          title: "Время привычки! ⏰",
          body: activity.title,
          data: {
            activityId: activity.id,
          },
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour: hours,
          minute: minutes,
        },
      });
    } else {
      const targetDays = activity.targetDays || [1, 2, 3, 4, 5, 6, 7];

      for (const isoDay of targetDays) {
        const expoWeekDay = isoToExpoWeekDay(Number(isoDay));
        const customId = `${baseId}_day_${isoDay}`;

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
            type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
            weekday: expoWeekDay,
            hour: hours,
            minute: minutes,
          },
        });
      }
    }
  }
}

export async function cancelActivityNotifications(activityId: number) {
  const baseId = `activity_reminder_${activityId}`;
  await Notifications.cancelScheduledNotificationAsync(baseId);

  for (let i = 1; i <= 7; i++) {
    await Notifications.cancelScheduledNotificationAsync(`${baseId}_day_${i}`);
  }
}
