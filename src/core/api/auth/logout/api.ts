import axios from "axios";

export const Logout = async () => {
  const Response = await axios.post("/api/auth/logout");

  return Response.data;
};
