import axios from "axios";

export const GetBookingAdmin = async () => {
  const Response = await axios.get(`/api/admin/bookings`);

  return Response.data;
};

export const GetBookingAdminById = async (id) => {
  const Response = await axios.get(`/api/admin/bookings/${id}`);

  return Response.data;
};
export const DeleteBookingAdminById = async (id) => {
  const Response = await axios.delete(`/api/admin/bookings/${id}`);

  return Response.data;
};

export const UpdateBookingAdminById = async (id, body) => {
  const Response = await axios.put(`/api/admin/bookings/${id}`, body);

  return Response.data;
};
