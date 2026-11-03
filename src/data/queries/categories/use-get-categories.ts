import { categoryRepository } from "@/data/repositories/category-repository";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories() {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isSuccess: isCategoriesLoaded,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: ["get all categories"],
    queryFn: () => categoryRepository.getAll(),
  });
  return {
    categories,
    isCategoriesLoading,
    isCategoriesLoaded,
    isCategoriesError,
  };
}
