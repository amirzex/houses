import axios from "axios";

export const GetChat = async () => {
  const Response = await axios.get(`/api/chats`);

  return Response.data;
};

export const GetChatHistory = async (room: string | number) => {
  const Response = await axios.get(`/api/chats/${room}`);

  return Response.data;
};

export const SendChat = async (body: {
  room: string;
  message: string;
  getterId: number;
}) => {
  const payload = {
    room: body.room,
    message: body.message,
    getterId: 175,
  };

  const Response = await axios.post(`/api/chats/send`, payload);
  return Response.data;
};

type UploadFileVars = {
  room: string;
  files: File[];
};

export const UploadFile = async ({ room, files }: UploadFileVars) => {
  if (!room) throw new Error("room (name) is required");
  if (!files || files.length === 0) throw new Error("files is required");

  const formData = new FormData();
  files.forEach((f) => formData.append("files", f));
  formData.append("getterId", "175");

  const res = await axios.post(`/api/chats/upload/${room}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const deleteChat = async (id: number) => {
  const Response = await axios.delete(`/api/chats/delete/${id}`);

  return Response.data;
};

export const UpdateChat = async (id: number, message: string) => {
  const Response = await axios.put(`/api/chats/edit/${id}`, {
    message: message,
  });

  return Response.data;
};
