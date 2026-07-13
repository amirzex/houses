import axios from "axios";

export const getLocations = async ({ queryKey }) => {
  const [_key, params] = queryKey;

  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const sort = params?.sort ?? "id";
  const order = params?.order ?? "ASC";
  const area_name = params?.area_name ?? "";
  const lat = params?.lat ?? "";
  const lng = params?.lng ?? "";

  const url = `/api/locations?page=${page}&limit=${limit}&sort=${sort}&order=${order}&area_name=${area_name}&lat=${lat}&lng=${lng}`;

  const response = await axios.get(url);
  return response.data;
};
