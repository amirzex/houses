import { useQuery } from "@tanstack/react-query";
import {
  getRent,
  getReservation,
  ISearchParams,
  searchProperties,
} from "./api";

export const useRentQuery = (params: any) => {
  return useQuery({
    queryKey: ["rent", params],
    queryFn: getRent,
  });
};

export const useReservationQuery = () => {
  return useQuery({
    queryKey: ["reservation"],
    queryFn: getReservation,
  });
};

//landing filter data query

export const useSearchProperties = (params: ISearchParams) => {
  return useQuery({
    queryKey: ["search-properties", params],
    queryFn: () => searchProperties(params),
    enabled: false,
  });
};
