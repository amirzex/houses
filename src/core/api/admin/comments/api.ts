import axios from "axios";

export const GetCommentsAdmin = async () => {
  const Response = await axios.get(`/api/admin/comments`);

  return Response.data;
};

export const GetCommentsAdminById = async (id) => {
  const Response = await axios.get(`/api/admin/comments/${id}`);

  return Response.data;
};
export const DeleteCommentsAdminById = async (id) => {
  const Response = await axios.delete(`/api/admin/comments/${id}`);

  return Response.data;
};
export const UpdateCommentsAdminById = async ({
  id,
  body,
}: {
  id: number;
  body: any;
}) => {
  const Response = await axios.put(`/api/admin/comments/${id}`, body);
  return Response.data;
};
