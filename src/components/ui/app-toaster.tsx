import { useAppTheme } from "@/theme/theme-provider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {Toaster} from 'sonner-native'

export function AppToaster(){
    const {colors, radius, resolvedTheme, spacing} = useAppTheme()
    const insets = useSafeAreaInsets();
    const topOffset = Math.max(insets.top + spacing.xl, 72);

    return (
        <Toaster
        position="top-center"
        theme={resolvedTheme}
        richColors={false}
        toastOptions={{
        style: {
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: radius.lg,
          backgroundColor: colors.surface,
        },
        titleStyle: {
          color: colors.text,
          fontSize: 15,
          fontWeight: '800',
        },
        descriptionStyle: {
          color: colors.textMuted,
          fontSize: 13,
        },
        success: { borderColor: colors.success, backgroundColor: colors.successSoft },
        error: { borderColor: colors.danger, backgroundColor: colors.dangerSoft },
        warning: { borderColor: colors.warning, backgroundColor: colors.warningSoft },
        info: { borderColor: colors.info, backgroundColor: colors.infoSoft },
      }}
      icons={{
        success: <Ionicons name="checkmark-circle" color={colors.success} size={26} />,
        error: <Ionicons name="alert-circle" color={colors.danger} size={26} />,
        warning: <Ionicons name="alert" color={colors.warning} size={26} />,
        info: <Ionicons name="information" color={colors.info} size={26} />,
        loading: <Ionicons name="refresh" color={colors.info} size={26} />,
      }}
        />
    )
}