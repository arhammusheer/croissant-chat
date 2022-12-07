import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../utils/defaults";

interface LoginParams {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;

  emoji: string;
  background: string;

  createdAt: Date;
  updatedAt: Date;
}

const login = createAsyncThunk<User, LoginParams>(
  "user/login",
  async (body, { rejectWithValue }) => {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (response.status === 401) {
      rejectWithValue("Unauthorized access");
    }

    const data = await response.json();

    return data.data.user;
  }
);

const getProfile = createAsyncThunk<User>(
  "user/getProfile",
  async (anything, { rejectWithValue }) => {
    const response = await fetch(`${API}/user/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.status === 401) {
      rejectWithValue("Unauthorized access");
    }

    const data = await response.json();

    return data.data.user;
  }
);

interface UserState {
  loading: boolean;
  isLoggedIn: boolean;
  error: string | null;
  profile: User | null;
}

const initialState = {
  loading: false,
  isLoggedIn: false,
  error: null,
  profile: null,
} as UserState;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.profile = action.payload;
    });

    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = "Login failed";
    });

    // Get Profile
    builder.addCase(getProfile.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.profile = action.payload;
    });

    builder.addCase(getProfile.rejected, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
    });
  },
});

export const userActions = {
  login,
  getProfile,
};

export default userSlice.reducer;
