import { useAppTheme } from "@/theme/theme-provider";
import WheelPicker, {
    type PickerItem,
    useOnPickerValueChangedEffect,
    usePickerControl,
    withPickerControl,
} from "@quidone/react-native-wheel-picker";
import { View } from "react-native";
import { AppText } from "./app-text";

const ControlPicker = withPickerControl(WheelPicker);

type ControlPickersMap = {
  hours: { item: PickerItem<string> };
  minutes: { item: PickerItem<string> };
};

const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i.toString().padStart(2, "0"),
}));
const minutes = Array.from({ length: 60 }, (_, i) => ({
  value: i.toString().padStart(2, "0"),
}));

export type TimePickerProps = {
  label?: string;
  value: string;
  onChange: (time: string) => void;
};

export function TimePicker({ label, value, onChange }: TimePickerProps) {
  const { colors, spacing, radius } = useAppTheme();
  const [currentHour, currentMinute] = value.split(":");

  const pickerControl = usePickerControl<ControlPickersMap>();

  useOnPickerValueChangedEffect(pickerControl, (event) => {
    const newHour = event.pickers.hours.item.value;
    const newMinute = event.pickers.minutes.item.value;
    const newTime = `${newHour}:${newMinute}`;
    onChange(newTime);
  });

  return (
    <View style={{ gap: spacing.sm }}>
      {label && (
        <AppText variant="caption">
          {label}: {value}
        </AppText>
      )}
      <View
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <ControlPicker
          control={pickerControl}
          pickerName={"hours"}
          data={hours}
          value={currentHour}
          width={"40%"}
          enableScrollByTapOnItem={true}
        />
        <AppText variant="title">:</AppText>
        <ControlPicker
          control={pickerControl}
          pickerName={"minutes"}
          data={minutes}
          value={currentMinute}
          width={"40%"}
          enableScrollByTapOnItem={true}
        />
      </View>
    </View>
  );
}
