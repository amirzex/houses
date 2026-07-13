import axios from "axios";

export const PostContact = async () => {
  const Response = await axios.post("/api/contact-us");
  return Response.data;
};
