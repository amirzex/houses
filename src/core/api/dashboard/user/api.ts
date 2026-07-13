import axios from "axios";

export const GetUser = async () => {
  const response = await axios.get("/api/user/profile");
  return response.data;
};

export const getUserWithActivity = async () => {
  const response = await axios.get("/api/user/profile");
  return response.data;
};

export const UpdateUser = async (updatedData: any) => {
  const response = await axios.put("/api/user/profile", updatedData);
  return response.data;
};
