import axios from "axios";
import { IProps } from "@/core/api/auth/login/api";

export const RegisterStep1 = async (data: IProps) => {
  const Response = await axios.post("/api/auth/register", data);

  return Response.data;
};

export const RegisterStep2 = async (data: IProps) => {
  const Response = await axios.post("/api/auth/verify-email", data);

  return Response.data;
};

export const RegisterComplete = async (data: IProps) => {
  const Response = await axios.post("/api/auth/complete-registration", data, {
    withCredentials: true,
  });

  return Response.data;
};
