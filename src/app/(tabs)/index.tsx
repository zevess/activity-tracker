import { Screen } from "@/components/ui/screen";
import { ScreenTitle } from "@/components/ui/screen-title";
import { useGetUserProfile } from "@/data/queries/user/use-get-user-profile";
import { ActivitiesSections } from "@/features/activities/ui/activities-sections";
import { getTimeOfDay } from "@/utils/get-time-of-day";

export default function HomeScreen() {
  const { profile } = useGetUserProfile();
  const timeOfDay = getTimeOfDay();

  return (
    <Screen>
      <ScreenTitle title={`${timeOfDay}, ${profile?.name}`} />
      <ActivitiesSections />
    </Screen>
  );
}
