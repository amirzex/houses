import axios from "axios";
import { BaseUrl } from "@/core/api/client";

export const GetHousesAdmin = async () => {
  const Response = await axios.get(
    `${BaseUrl}/api/houses?page=1&limit=10&order=DESC&sort=last_updated`,
  );

  return Response.data;
};

export const CreateHousesAdmin = async (body: any) => {
  const Response = await axios.post(`/api/houses`, body);

  return Response.data;
};

export const DeleteHousesAdmin = async (id: number | string) => {
  const Response = await axios.delete(`/api/houses/${id}`);

  return Response.data;
};
