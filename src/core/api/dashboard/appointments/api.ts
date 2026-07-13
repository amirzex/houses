import axios from "axios";
import { BaseUrl } from "@/core/api/client";

export const GetAppointMents = async (id) => {
  const Response = await axios.get(
    `${BaseUrl}/api/visit-appointments/house/${id}`,
  );

  return Response.data;
};

export const GetAppointMentsUser = async () => {
  const Response = await axios.get("/api/visit-appointments/user");

  return Response.data;
};
