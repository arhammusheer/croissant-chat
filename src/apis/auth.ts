import axios from "axios";
import { APIURL } from "./urls";

export const login_emailpassword = async (email: string, password: string) => {
  const response = await axios.post(
    `${APIURL}/auth/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data.data;
};
