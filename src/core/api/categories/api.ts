import axios from "axios";

export const getCategories = async ({ queryKey }) => {
  const [_key, params] = queryKey;

  const page = params?.page ?? 1;
  const limit = params?.limit ?? 10;
  const sort = params?.sort ?? "name";
  const order = params?.order ?? "DESC";
  const name = params?.name ?? "";

  const url = `/api/categories?page=${page}&limit=${limit}&sort=${sort}&order=${order}&name=${name}`;

  const response = await axios.get(url);

  return response.data;
};
