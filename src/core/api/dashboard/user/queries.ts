import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetUser, getUserWithActivity, UpdateUser } from "./api";

export const useUser = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: GetUser,
  });
};
export const useUserActivity = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserWithActivity,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData: any) => UpdateUser(updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["user-profile"]);
    },
  });
};
