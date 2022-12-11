import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../utils/defaults";

interface LocationState {
  coordinates: {
    latitude: number;
    longitude: number;
  };

  radius: number;

  isAvailable: boolean;
  timestamp: number;
  loading: boolean;
  error: string | undefined;
}

const initialState: LocationState = {
  coordinates: {
    latitude: 0,
    longitude: 0,
  },

  radius: 5,

  isAvailable: false,
  timestamp: 0,
  loading: false,
  error: undefined,
};

const updateLocation = createAsyncThunk<LocationState>(
  "location/updateLocation",
  () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (
            position.coords.latitude !== 0 &&
            position.coords.longitude !== 0
          ) {
            sendLocationLog({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          }
          resolve({
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },

            radius: 5,

            isAvailable: true,
            timestamp: position.timestamp,
            loading: false,
            error: undefined,
          });
        },
        (error) => {
          fetch(`${API}/utils/geoip`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          })
            .then(async (response) => {
              const { data } = await response.json();
              const { lat, lon } = data.geo;
              const latitude = lat;
              const longitude = lon;
              console.log("latitude", latitude);
              console.log("longitude", longitude);

              // sendLocationLog({
              //   latitude: Number(latitude),
              //   longitude: Number(longitude),
              // });
              resolve({
                coordinates: {
                  latitude: latitude,
                  longitude: longitude,
                },

                radius: 5,

                isAvailable: true,
                timestamp: 0,
                loading: false,
                error: undefined,
              });
            })
            .catch((error) => {
              reject(error);
            });

          // reject(error);
        }
      );
    });
  }
);

const sendLocationLog = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const response = await fetch(`${API}/user/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      latitude,
      longitude,
    }),
  });

  const data = await response.json();

  return data;
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    updateRadius: (state, action) => {
      state.radius = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(updateLocation.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateLocation.fulfilled, (state, action) => {
      state.loading = false;
      state.coordinates = action.payload.coordinates;
      state.isAvailable = action.payload.isAvailable;
      state.timestamp = action.payload.timestamp;
    });

    builder.addCase(updateLocation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const locationActions = {
  updateLocation,
  ...locationSlice.actions,
};

export default locationSlice.reducer;
