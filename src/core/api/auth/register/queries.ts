import { useMutation } from "@tanstack/react-query";
import { RegisterComplete, RegisterStep1, RegisterStep2 } from "./api";

export const useRegisterStep1 = () => {
  return useMutation({
    mutationFn: RegisterStep1,
  });
};
export const useRegisterStep2 = () => {
  return useMutation({
    mutationFn: RegisterStep2,
  });
};
export const useRegisterComplete = () => {
  return useMutation({
    mutationFn: RegisterComplete,
  });
};
