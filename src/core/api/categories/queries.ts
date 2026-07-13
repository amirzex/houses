// hooks/useCategories.js
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./api";

export const useCategories = (params) => {
  return useQuery({
    queryKey: ["categories", params],
    queryFn: getCategories,
  });
};
