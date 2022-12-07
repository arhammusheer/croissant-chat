import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../utils/defaults";

interface Room {
  id: string;
  name: string;
  distance: number;
  createdAt: string;
  updatedAt: string;
}

interface RoomState {
  metadata: Room;
  messages: Message[];
  isLoading: boolean;
}

interface Message {
  id: string;
  roomId: string;
  userId: string;
  text: string;

  createdAt: string;
  updatedAt: string;
}

interface RoomForm {
  name: string;
  latitude: number;
  longitude: number;
}

interface RoomsState {
  rooms: RoomState[];

  loading: boolean;
  isCreating: boolean;
  error: string | undefined;
}

const initialState: RoomsState = {
  rooms: [],
  loading: false,
  isCreating: false,
  error: undefined,
};

const createRoom = createAsyncThunk<Room, RoomForm>(
  "rooms/createRoom",
  async ({ name, latitude, longitude }) => {
    const response = await fetch(`${API}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        latitude,
        longitude,
      }),
    });

    const room = await response.json();

    return room;
  }
);

const fetchRooms = createAsyncThunk<
  Room[],
  {
    latitude: number;
    longitude: number;
    radius: number;
  }
>("rooms/fetchRooms", async ({ latitude, longitude, radius }) => {
  const response = await fetch(
    `${API}/rooms?latitude=${latitude}&longitude=${longitude}&radius=${radius}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  return data.data.rooms;
});

const loadMessages = createAsyncThunk<
  Message[],
  {
    roomId: string;
  }
>("rooms/loadMessages", async ({ roomId }) => {
  const response = await fetch(`${API}/rooms/${roomId}/messages`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",
  });

  const data = await response.json();

  return data.data.messages;
});

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Create room
    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.isCreating = false;
      state.rooms.push({
        metadata: action.payload,
        messages: [],
        isLoading: false,
      });
    });

    builder.addCase(createRoom.pending, (state) => {
      state.isCreating = true;
    });

    builder.addCase(createRoom.rejected, (state, action) => {
      state.isCreating = false;
      state.error = action.error.message;
    });

    // Fetch rooms
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.loading = false;

      state.rooms = action.payload.map((room) => ({
        metadata: room,
        messages: [],
        isLoading: false,
      }));
    });

    builder.addCase(fetchRooms.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchRooms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Load messages
    builder.addCase(loadMessages.fulfilled, (state, action) => {
      const room = state.rooms.find((room) => room.isLoading);

      if (room) {
        room.isLoading = false;
        // Append messages to the room
        room.messages = [...room.messages, ...action.payload];

        // Sort messages by createdAt
        room.messages.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);

          return dateA.getTime() - dateB.getTime();
        });
      }
    });

    builder.addCase(loadMessages.pending, (state, action) => {
      const room = state.rooms.find(
        (room) => room.metadata.id === action.meta.arg.roomId
      );

      if (room) {
        room.isLoading = true;
      }
    });

    builder.addCase(loadMessages.rejected, (state, action) => {
      const room = state.rooms.find((room) => room.isLoading);

      if (room) {
        room.isLoading = false;
      }
    });
  },
});

export const roomActions = {
  createRoom,
  fetchRooms,
  ...roomsSlice.actions,
};

export default roomsSlice.reducer;
