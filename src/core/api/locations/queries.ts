import { useQuery } from "@tanstack/react-query";
import { getLocations } from "./api";

export const useLocations = (params) => {
  return useQuery({
    queryKey: ["locations", params],
    queryFn: getLocations,
    // keepPreviousData: true,
  });
};
