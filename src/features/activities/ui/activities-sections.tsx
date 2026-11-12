import { AppText } from "@/components/ui/app-text";
import { Collapsible } from "@/components/ui/collapsible";
import { SectionHeader } from "@/components/ui/section-header";
import { useGetCompletedActivitiesToday } from "@/data/queries/activities/use-get-completed-activities-today";
import { useGetMissedActivities } from "@/data/queries/activities/use-get-missed-activities";
import { useGetUpcomingActivities } from "@/data/queries/activities/use-get-upcoming-activities";
import { format } from "date-fns";
import { View } from "react-native";
import { ActivityCard } from "./activity-card";
import { MissedActivities } from "./missed-activities";

export function ActivitiesSections() {
  const date = new Date();
  const todayStr = format(date, "yyyy-MM-dd");
  const { upcomingActivities } = useGetUpcomingActivities();
  const { missedActivities } = useGetMissedActivities();
  const { completedToday } = useGetCompletedActivitiesToday();

  const todayActivities = upcomingActivities?.filter(
    (activity) => format(activity.nextDueDate, "yyyy-MM-dd") === todayStr,
  );
  const pendingActivities = upcomingActivities?.filter(
    (activity) => format(activity.nextDueDate, "yyyy-MM-dd") !== todayStr,
  );

  return (
    <View style={{ gap: 16 }}>
      <SectionHeader title="Сегодняшние активности" />
      {todayActivities && todayActivities.length > 0 ? (
        todayActivities.map((activity) => (
          <View style={{ gap: 12 }} key={activity.id}>
            {activity.isOverdue && <AppText tone="danger">Просрочено</AppText>}
            <ActivityCard key={activity.id} activity={activity} />
          </View>
        ))
      ) : (
        <AppText
          variant="subtitle"
          tone="muted"
          style={{ textAlign: "center", paddingVertical: "33%" }}
        >
          Нет активностей на сегодня
        </AppText>
      )}
      <Collapsible
        title={`Пропущенные: ${missedActivities?.length}`}
        defaultOpen
      >
        {missedActivities && missedActivities.length > 0 ? (
          <MissedActivities missedActivities={missedActivities} />
        ) : (
          <AppText
            variant="subtitle"
            tone="muted"
            style={{ textAlign: "center" }}
          >
            Ничего не пропущено
          </AppText>
        )}
      </Collapsible>

      <Collapsible title="Выполнено сегодня" defaultOpen={false}>
        {completedToday && completedToday.length > 0 ? (
          completedToday.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <AppText
            variant="subtitle"
            tone="muted"
            style={{ textAlign: "center" }}
          >
            Сегодня ничего не выполнено
          </AppText>
        )}
      </Collapsible>
      <Collapsible title="Ближайшие активности" defaultOpen={false}>
        {pendingActivities && pendingActivities.length > 0 ? (
          pendingActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))
        ) : (
          <AppText
            variant="subtitle"
            tone="muted"
            style={{ textAlign: "center" }}
          >
            Нет ближайших активностей
          </AppText>
        )}
      </Collapsible>
    </View>
  );
}
