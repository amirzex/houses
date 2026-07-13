import axios from "axios";
import { IProps } from "@/core/api/auth/login/api";

export const ForgotStep1 = async (data: IProps) => {
  const Response = await axios.post("/api/auth/forgot-password/request", data);

  return Response.data;
};
export const ForgotStep2 = async (data: IProps) => {
  const Response = await axios.post("/api/auth/forgot-password/verify", data);

  return Response.data;
};
export const ForgotStep3 = async (data: IProps) => {
  const Response = await axios.post("/api/auth/forgot-password/reset", data);

  return Response.data;
};
