import { AppText } from "@/components/ui/app-text";
import { Screen } from "@/components/ui/screen";
import { useGetUserProfile } from "@/data/queries/user/use-get-user-profile";
import { ActivitiesSections } from "@/features/activities/ui/activities-sections";
import { getTimeOfDay } from "@/utils/get-time-of-day";
import { View } from "react-native";

export default function HomeScreen() {
  const { profile } = useGetUserProfile();
  const timeOfDay = getTimeOfDay();

  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <AppText variant="hero">
          {timeOfDay}, {profile?.name}
        </AppText>
      </View>

      <ActivitiesSections />
    </Screen>
  );
}
