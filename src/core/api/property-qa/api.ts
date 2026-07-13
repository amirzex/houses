import axios from "axios";
import { BaseUrl } from "@/core/api/client";

export const Question = async () => {
  const Response = await axios.post(`${BaseUrl}/api/property-qa/question`);

  return Response.data;
};
