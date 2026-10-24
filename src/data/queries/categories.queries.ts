import { useQuery } from "@tanstack/react-query";
import { categoryRepository } from "../repositories/category-repository";

const categoriesKeys = {
  all: ["categories"] as const,
};

export function useGetCategories() {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isSuccess: isCategoriesLoaded,
    isError: isCategoriesError,
  } = useQuery({
    queryKey: categoriesKeys.all,
    queryFn: () => categoryRepository.getAll(),
  });
  return {
    categories,
    isCategoriesLoading,
    isCategoriesLoaded,
    isCategoriesError,
  };
}
