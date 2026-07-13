import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateMaintenance, DeleteMaintenance, GetMaintenance } from "./api";

export const useMaintenanceRequests = () => {
  return useQuery({
    queryKey: ["maintenance-requests"],
    queryFn: GetMaintenance,
  });
};

export const useDeleteMaintenance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => DeleteMaintenance(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-requests"] });
      console.log("آیتم با موفقیت حذف شد");
    },

    onError: (error) => {
      console.error("خطا در حذف آیتم:", error);
    },
  });
};

export const useCreateMaintenance = () => {
  return useMutation({
    mutationFn: ({
      houseId,
      description,
    }: {
      houseId: number;
      description: string;
    }) => CreateMaintenance(houseId, description),
  });
};
