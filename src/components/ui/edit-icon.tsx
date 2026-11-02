import { useRouter } from "expo-router";
import { IconButton } from "./icon-button";

export function EditButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <IconButton
      onPress={() =>
        router.navigate({
          pathname: "/activity/[id]/edit",
          params: { id },
        })
      }
      name="pencil"
      variant="primary"
    />
  );
}
