
import { useQuery } from "@tanstack/react-query";
import { getHouseById } from "./api";

export const useHouseById = (id) => {
  return useQuery({
    queryKey: ["house", id],
    queryFn: () => getHouseById(id),
    enabled: !!id,
  });
};
