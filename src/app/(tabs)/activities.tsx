import { ActivityCard } from "@/components/activity-card/activity-card";
import { AppText } from "@/components/ui/app-text";
import { Divider } from "@/components/ui/divider";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { SectionHeader } from "@/components/ui/section-header";
import { View } from "react-native";

export default function ActivitiesScreen() {
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
        <IconButton name="add" variant="primary" />
      </View>

      <SectionHeader title="Привычки" />

      <View style={{ gap: 12 }}>
        <ActivityCard
          category="Лекарства"
          time="18:00"
          title="Выпить таблетки"
        />
        <ActivityCard
          category="Лекарства"
          time="18:00"
          title="Выпить таблетки"
        />
      </View>
      <Divider />

      <SectionHeader title="Активности" />
      <View style={{ gap: 12 }}>
        <ActivityCard
          category="Лекарства"
          time="18:00"
          title="Выпить таблетки"
        />
        <ActivityCard
          category="Лекарства"
          time="18:00"
          title="Выпить таблетки"
        />
      </View>
    </Screen>
  );
}
