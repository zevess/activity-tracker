import { useRouter } from "expo-router";
import { IconButton } from "./icon-button";

export function BackButton() {
  const router = useRouter();
  return (
    <IconButton
      onPress={() => router.back()}
      name="arrow-back"
      variant="primary"
    />
  );
}
