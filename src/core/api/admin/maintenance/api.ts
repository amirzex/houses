import axios from "axios";

export const GetMaintenance = async () => {
  const Response = await axios.get(`/api/maintenance-requests`);

  return Response.data;
};

export const CreateMaintenance = async (
  houseId: number,
  description: string,
) => {
  const body = {
    houseId: houseId,
    description: description,
  };

  const Response = await axios.post(`/api/maintenance-requests`, body);

  return Response.data;
};

export const DeleteMaintenance = async (id) => {
  const Response = await axios.delete(`/api/maintenance-requests/${id}`);

  return Response.data;
};
