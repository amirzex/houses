import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteChat,
  GetChat,
  GetChatHistory,
  SendChat,
  UpdateChat,
  UploadFile,
} from "./api";

export const useGetRoom = () => {
  return useQuery({
    queryKey: ["room"],
    queryFn: GetChat,
  });
};

export const useGetChatHistory = (room: string | number) => {
  return useQuery({
    queryKey: ["chat-history", room],
    queryFn: () => GetChatHistory(room),
    enabled: !!room,
  });
};

export const useSendChat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: { room: string; message: string; getterId: number }) =>
      SendChat(body),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chat-history", variables.room],
      });
    },

    onError: (error) => {
      console.error("خطا در ارسال پیام:", error);
    },
  });
};

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: UploadFile,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["chat-history", variables.room],
      });
    },
    onError: (error) => {
      alert("خطا در آپلود فایل");
      console.error(error);
    },
  });
};

export const useDeleteChat = (roomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteChat(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-history", roomId],
      });
    },
    onError: (error) => {
      console.error("خطا در حذف پیام:", error);
    },
  });
};
export const useUpdateChat = (roomId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) =>
      UpdateChat(id, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-history", roomId],
      });
    },
  });
};
