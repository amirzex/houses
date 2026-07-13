import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteBookingAdminById,
  GetBookingAdmin,
  GetBookingAdminById,
  UpdateBookingAdminById,
} from "./api";

export const useGetAdminBookings = () => {
  return useQuery({
    queryKey: ["admin-bookings"],
    queryFn: GetBookingAdmin,
  });
};

export const useGetAdminBookingById = (id: string) => {
  return useQuery({
    queryKey: ["admin-booking", id],
    queryFn: () => GetBookingAdminById(id),
    enabled: !!id,
  });
};

export const useDeleteAdminBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => DeleteBookingAdminById(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-bookings"],
      });
    },
  });
};

export const useUpdateAdminBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      UpdateBookingAdminById(id, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-bookings"],
      });
    },
  });
};
