import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  DeleteCommentsAdminById,
  GetCommentsAdmin,
  GetCommentsAdminById,
  UpdateCommentsAdminById,
} from "./api";


export const useGetCommentsAdmin = () => {
  return useQuery({
    queryKey: ["admin-comments"],
    queryFn: GetCommentsAdmin,
  });
};


export const useGetCommentsAdminById = (id) => {
  return useQuery({
    queryKey: ["admin-comment", id],
    queryFn: () => GetCommentsAdminById(id),
    enabled: !!id,
  });
};


export const useDeleteCommentsAdminById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: DeleteCommentsAdminById,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
      queryClient.invalidateQueries({ queryKey: ["admin-comment", id] });
    },
  });
};

// آپدیت کامنت
export const useUpdateCommentsAdminById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UpdateCommentsAdminById,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-comments"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-comment", variables.id],
      });
    },
  });
};
