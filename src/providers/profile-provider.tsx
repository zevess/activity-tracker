import { StatusMessage } from "@/components/ui/status-message";
import { useGetUserProfile } from "@/data/queries/user/use-get-user-profile";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { profile, isProfileLoaded, isProfileError, isProfileLoading } =
    useGetUserProfile();

  useEffect(() => {
    if (isProfileLoading) return;
    if (isProfileLoaded && (!profile || profile.name === "Пользователь")) {
      router.replace("/user");
    }
  }, [profile, isProfileLoaded, isProfileLoading, router]);
  if (isProfileLoading) {
    return <StatusMessage isLoading />;
  }

  return <>{children}</>;
}
