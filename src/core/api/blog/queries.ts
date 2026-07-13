import { useQuery } from "@tanstack/react-query";
import { GetBlog, GetBlogById } from "./api";

export const useGetBlog = (category_id, title) => {
  return useQuery({
    queryKey: ["blogs", category_id, title], // اضافه شد
    queryFn: () => GetBlog(category_id, title),
  });
};

export const useGetBlogById = (id) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => GetBlogById(id),
    enabled: !!id,
  });
};
