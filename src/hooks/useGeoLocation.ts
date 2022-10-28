import { useContext } from "react";
import { GlobalContext } from "../main";

function useGeoLocation() {
  const gctx = useContext(GlobalContext);

  const refresh = async () => {
    console.log("refreshing geolocation");

    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    gctx.setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });

    localStorage.setItem(
      "location",
      JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };

  return { refresh, lat: gctx.location.lat, lng: gctx.location.lng };
}

export default useGeoLocation;
