import axios from "axios";

export interface IProps {
  data: string;
}

export const Login = async (data: IProps) => {
  const Response = await axios.post("/api/auth/login", data);

  return Response.data;
};
