import { Screen } from "@/components/ui/screen";
import { ScreenTitle } from "@/components/ui/screen-title";
import { ActivityForm } from "@/features/activities/ui/activity-form";

export default function NewActivityScreen() {
  return (
    <Screen>
      <ScreenTitle variant="title" withBack title="Новая активность" />
      <ActivityForm mode="create" />
    </Screen>
  );
}
