import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteUserAdmin,
  GetUserAdmin,
  UpdateUserAdmin,
  UpdateUserAdminRole,
} from "./api";

export const useGetAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: GetUserAdmin,
  });
};

export const useUpdateAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }) => UpdateUserAdmin(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
};

export const useDeleteAdminUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => DeleteUserAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
};

export const useUpdateAdminUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }) => UpdateUserAdminRole(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
};
