import { useMutation } from "@tanstack/react-query";
import { Login } from "./api";

export const useLogin = () => {
  return useMutation({
    mutationFn: Login,
  });
};
