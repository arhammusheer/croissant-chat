import { useContext, useEffect } from "react";
import { createRoom, getRoomsNearby } from "../apis/rooms";
import { GlobalContext } from "../main";
import useGeoLocation from "./useGeoLocation";

function useRooms() {
  const gctx = useContext(GlobalContext);

  const refresh = (lat: number, lng: number) => {
    getRoomsNearby(lat, lng).then((rooms) => {
      gctx.setRooms(rooms);
    });
  };

  const newRoom = (name: string) => {
    createRoom(name, gctx.location.lat, gctx.location.lng).then((room) => {
      gctx.setRooms([...gctx.rooms, room]);
    });
  };

  return { refresh, newRoom, rooms: gctx.rooms };
}

export default useRooms;
