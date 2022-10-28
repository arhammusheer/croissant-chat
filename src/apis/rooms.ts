import axios from "axios";
import { APIURL } from "./urls";

export const getRoomsNearby = async (lat: number, lng: number) => {
  const response = await axios.get(`${APIURL}/rooms`, {
    params: {
      latitude: lat,
      longitude: lng,
    },
    withCredentials: true,
  });

  return response.data.data.rooms;
};

export const createRoom = async (name: string, lat: number, lng: number) => {
  const response = await axios.post(
    `${APIURL}/rooms`,
    {
      name,
      latitude: lat,
      longitude: lng,
    },
    {
      withCredentials: true,
    }
  );

  return response.data.data;
};
