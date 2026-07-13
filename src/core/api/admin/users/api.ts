import axios from "axios";

export const GetUserAdmin = async () => {
  const Response = await axios.get(`/api/admin/users`);

  return Response.data;
};
export const UpdateUserAdmin = async (id, body) => {
  const Response = await axios.get(`/api/admin/users/${id}`, body);

  return Response.data;
};
export const DeleteUserAdmin = async (id) => {
  const Response = await axios.delete(`/api/admin/users/${id}`);

  return Response.data;
};
export const UpdateUserAdminRole = async (id, body) => {
  const Response = await axios.put(`/api/admin/users/${id}/role`, body);

  return Response.data;
};
