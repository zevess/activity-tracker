import { userRepository } from "@/data/repositories/user-repository";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUserProfile() {
  const {
    mutate: updateProfile,
    isError: isProfileUpdateError,
    isPending: isProfileUpdating,
  } = useMutation({
    mutationKey: ["get user profile"],
    mutationFn: (name: string) => userRepository.updateProfile(name),
  });
  return { updateProfile, isProfileUpdateError, isProfileUpdating };
}
