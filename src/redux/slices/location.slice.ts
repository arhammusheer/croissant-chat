import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface LocationState {
  coordinates: {
    latitude: number;
    longitude: number;
  };

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
          resolve({
            coordinates: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            isAvailable: true,
            timestamp: position.timestamp,
            loading: false,
            error: undefined,
          });
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
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
};

export default locationSlice.reducer;
