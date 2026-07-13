import axios from "axios";

export const GetPayments = async () => {
  const Response = await axios.get(`/api/admin/payments`);

  return Response.data;
};

export const GetPaymentsById = async (id) => {
  const Response = await axios.get(`/api/admin/payments/${id}`);

  return Response.data;
};

export const UpdatePaymentsById = async (id, body) => {
  const Response = await axios.put(`/api/admin/payments/${id}`, body);

  return Response.data;
};

export const DeletePaymentsById = async (id) => {
  const Response = await axios.delete(`/api/admin/payments/${id}`);

  return Response.data;
};
