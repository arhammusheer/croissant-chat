import axios from "axios";
import { APIURL } from "./urls";

export const getUser = async () => {
  const response = await axios.get(`${APIURL}/user`);
  return response.data;
};
