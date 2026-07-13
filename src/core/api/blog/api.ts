import axios from "axios";
import { BaseUrl } from "@/core/api/client";

export const GetBlog = async (category_id, title) => {
  const Response = await axios.get(`${BaseUrl}/api/blogs`, {
    params: {
      category_id: category_id || undefined,
      title: title || undefined,
    },
  });
  return Response.data;
};

export const GetBlogById = async ({ id }) => {
  const Response = await axios.get(`${BaseUrl}/api/blogs/${id}`);
  return Response.data;
};
