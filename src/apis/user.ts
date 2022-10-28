import axios from "axios";
import { APIURL } from "./urls";

export const getUser = async () => {
  const response = await axios.get(`${APIURL}/user/profile`, {
    withCredentials: true,
  });

  return response.data.data;
};

export const randomizeEmoji = async () => {
  const response = await axios.patch(
    `${APIURL}/user/randomize-emoji`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data.data;
};
