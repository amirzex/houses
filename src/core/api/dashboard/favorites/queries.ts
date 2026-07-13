import { useQuery } from "@tanstack/react-query";
import { GetFavorites } from "./api";

export const useGetFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => GetFavorites(),
  });
};
