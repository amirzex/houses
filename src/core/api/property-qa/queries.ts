import { useMutation } from "@tanstack/react-query";
import { Question } from "./api";

export const useQuestion = () => {
  return useMutation({
    mutationFn: Question,
  });
};
