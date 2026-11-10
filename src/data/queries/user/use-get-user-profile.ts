import { userRepository } from "@/data/repositories/user-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetUserProfile() {
  const {
    data: profile,
    isError: isProfileError,
    isLoading: isProfileLoading,
    isSuccess: isProfileLoaded,
  } = useQuery({
    queryKey: ["get user profile"],
    queryFn: () => userRepository.getProfile(),
  });
  return { profile, isProfileError, isProfileLoading, isProfileLoaded };
}
