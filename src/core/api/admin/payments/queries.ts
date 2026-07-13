import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DeletePaymentsById,
  GetPayments,
  GetPaymentsById,
  UpdatePaymentsById,
} from "./api";

export const useGetPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: GetPayments,
  });
};

export const useGetPaymentsById = (id) => {
  return useQuery({
    queryKey: ["payments", id],
    queryFn: () => GetPaymentsById(id),
    enabled: !!id,
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    
    mutationFn: (payload: { id: string | number; body: { status: string } }) =>
      UpdatePaymentsById(payload.id, payload.body),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => DeletePaymentsById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};
