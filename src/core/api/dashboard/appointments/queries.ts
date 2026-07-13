import { useQuery } from "@tanstack/react-query";
import { GetAppointMents, GetAppointMentsUser } from "./api";

export const useGetAppointments = (id) => {
  return useQuery({
    queryKey: ["appointments", id],
    queryFn: () => GetAppointMents(id),
    enabled: !!id,
  });
};

export const useGetAppointUser = () => {
  return useQuery({
    queryKey: ["appointmentsUser"],
    queryFn: () => GetAppointMentsUser(),
  });
};
