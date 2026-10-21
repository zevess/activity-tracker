import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { activityRepository } from "../repositories/activity-repository";
import { CreateActivityInput } from "../types/activities.types";

const activitiesKeys = {
  all: ["activities"] as const,
};

export function useGetActivities() {
  const { data: activities } = useQuery({
    queryKey: activitiesKeys.all,
    queryFn: () => activityRepository.getAll(),
  });
  return { activities };
}

export function useCreateActivity() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: createActivity } = useMutation({
    mutationFn: (data: CreateActivityInput) => activityRepository.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: activitiesKeys.all });
      router.push("/activities");
    },
  });
  return { createActivity };
}
