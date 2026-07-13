import { useMutation } from "@tanstack/react-query";
import { ForgotStep1, ForgotStep2, ForgotStep3 } from "./api";

export const useForgotStep1 = () => {
  return useMutation({
    mutationFn: ForgotStep1,
  });
};
export const useForgotStep2 = () => {
  return useMutation({
    mutationFn: ForgotStep2,
  });
};
export const useForgotStep3 = () => {
  return useMutation({
    mutationFn: ForgotStep3,
  });
};
