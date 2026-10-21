import { ActivityCard } from "@/components/activity-card/activity-card";
import { AppText } from "@/components/ui/app-text";
import { Divider } from "@/components/ui/divider";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { SectionHeader } from "@/components/ui/section-header";
import { useGetActivities } from "@/data/queries/activities.queries";
import { Link } from "expo-router";
import { View } from "react-native";

export default function ActivitiesScreen() {
  const { activities } = useGetActivities();
  return (
    <Screen>
      {/* <HeroPanel eyebrow="Активности" title="Здесь ваши активности" body="тексттщшуцоео шуцщшоещуц шощеу цошецу ощшеуцшщ ео щцуо цуешщое шщуцощеш уц"/> */}
      {/* <Input placeholder="Добавить активность" leftIcon="add" /> */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppText variant="hero">Активности</AppText>
        <Link href={"/activity/new"} asChild>
          <IconButton name="add" variant="primary" />
        </Link>
      </View>

      <SectionHeader title="Привычки" />

      <View style={{ gap: 12 }}>
        {activities?.map((activity) => (
          <ActivityCard
            key={activity.id}
            type={activity.type ?? "habit"}
            title={activity.title}
            dueTime={activity.dueTime}
            completedAt={String(activity.completedAt)}
            scheduleType={activity.scheduleType ?? "custom"}
            targetDaye={[]}
            reminderTime={null}
          />
        ))}
      </View>
      <Divider />

      <SectionHeader title="Активности" />
    </Screen>
  );
}
