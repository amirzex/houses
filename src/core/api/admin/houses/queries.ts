import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateHousesAdmin,
  DeleteHousesAdmin,
  GetHousesAdmin,
} from "./api";

export const useGetHousesAdmin = () => {
  return useQuery({
    queryKey: ["admin-houses"],
    queryFn: GetHousesAdmin,
  });
};

export const useCreateHouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CreateHousesAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["houses"] });
      console.log("خانه با موفقیت ثبت شد");
    },
    onError: (error) => {
      console.error("خطا در ثبت خانه:", error.message);
    },
  });
};

export const useDeleteHouse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => DeleteHousesAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["houses"] });
    },
    onError: (error: any) => {
      console.error("خطا در حذف ملک:", error?.message || error);
    },
  });
};
