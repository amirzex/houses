
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout } from "./api";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: Logout,
    onSuccess: () => {
      queryClient.clear();

      router.push("/");
    },
    onError: (error) => {
      console.error("خطا در هنگام خروج:", error);
    },
  });
};
