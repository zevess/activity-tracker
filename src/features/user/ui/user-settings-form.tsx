import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateUserProfile } from "@/data/queries/user/use-update-user-profile";
import { useState } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type UserSettingsFormProps = {
  userName?: string | null;
  onSuccess?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function UserSettingsForm({
  onSuccess,
  userName,
  style,
}: UserSettingsFormProps) {
  const [name, setName] = useState<string>(userName || "");
  const { updateProfile } = useUpdateUserProfile();

  function handlePress() {
    if (name) {
      updateProfile(name, {
        onSuccess,
      });
    }
  }
  return (
    <>
      <View
        style={style}
      >
        <Input
          label="Имя"
          size="lg"
          value={name}
          onChangeText={setName}
          placeholder="Как к вам обращаться?"
        />
      </View>
      <Button onPress={handlePress} label="Сохранить" />
    </>
  );
}
