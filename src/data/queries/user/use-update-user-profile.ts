import { userRepository } from "@/data/repositories/user-repository";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const {
    mutate: updateProfile,
    isError: isProfileUpdateError,
    isPending: isProfileUpdating,
  } = useMutation({
    mutationKey: ["update user profile"],
    mutationFn: (name: string) => userRepository.updateProfile(name),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get user profile"],
      });
    },
  });
  return { updateProfile, isProfileUpdateError, isProfileUpdating };
}
