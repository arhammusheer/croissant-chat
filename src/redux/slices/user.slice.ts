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

  token: string;
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

    return {
      ...data.data.user,
      token: data.data.token,
    };
  }
);

const passwordlessLogin = createAsyncThunk<
  User,
  {
    code: string;
  }
>("user/passwordlessLogin", async ({ code }, { rejectWithValue }) => {
  const response = await fetch(
    `${API}/auth/passwordless/callback?code=${code}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (response.status === 401) {
    rejectWithValue("Unauthorized access");
  }

  const data = await response.json();

  return {
    ...data.data.user,
    token: data.data.token,
  };
});

const loginWithGoogle = createAsyncThunk<User, string>(
  "user/loginWithGoogle",
  async (token, { rejectWithValue }) => {
    const response = await fetch(`${API}/auth/google/?token=${token}`, {
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

    return {
      ...data.data.user,
      token: data.data.token,
    };
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

const randomizeEmoji = createAsyncThunk<User>(
  "user/randomizeEmoji",
  async (anything, { rejectWithValue }) => {
    const response = await fetch(`${API}/user/randomize-emoji`, {
      method: "PATCH",
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

    // Randomize Emoji
    builder.addCase(randomizeEmoji.fulfilled, (state, action) => {
      state.profile = action.payload;
    });

    // Passwordless Login
    builder.addCase(passwordlessLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.profile = action.payload;
    });
    builder.addCase(passwordlessLogin.rejected, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = "Login failed. Your code may have expired.";
    });

    builder.addCase(passwordlessLogin.pending, (state) => {});

    // Login with Google
    builder.addCase(loginWithGoogle.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.profile = action.payload;
    });

    builder.addCase(loginWithGoogle.rejected, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = "Login failed";
    });

    builder.addCase(loginWithGoogle.pending, (state) => {
      state.loading = true;
    });
  },
});

export const userActions = {
  login,
  passwordlessLogin,
  getProfile,
  randomizeEmoji,
  loginWithGoogle,
};

export default userSlice.reducer;
