import { configureStore } from "@reduxjs/toolkit";
import locationSlice from "./slices/location.slice";
import peopleSlice from "./slices/people.slice";
import roomsSlice from "./slices/rooms.slice";
import userSlice from "./slices/user.slice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    user: userSlice,
    rooms: roomsSlice,
    location: locationSlice,
    people: peopleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
