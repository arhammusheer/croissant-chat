import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../utils/defaults";
import { RootState } from "../store";

interface Person {
  id: string;
  emoji: string;
  background: string;
}

interface PeopleState {
  people: Record<string, Person>;
}

const initialState: PeopleState = {
  people: {},
};

const getProfile = createAsyncThunk<Person, string>(
  "people/getProfile",
  async (id, { getState }) => {
    const response = await fetch(`${API}/people/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    const person = data.data.profile;

		return {
			id: person.id,
			emoji: person.emoji,
			background: person.backgroundColor,
		}
  }
);

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    addPerson(state, action) {
      const { id, emoji, background } = action.payload;
      state.people[id] = { id, emoji, background };
    },

    removePerson(state, action) {
      const { id } = action.payload;
      delete state.people[id];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProfile.fulfilled, (state, action) => {
      const { id, emoji, background } = action.payload;
      state.people[id] = { id, emoji, background };
    });

    builder.addCase(getProfile.rejected, (state, action) => {
      const id = action.meta.arg;
      delete state.people[id];
    });
    builder.addCase(getProfile.pending, (state, action) => {
      const id = action.meta.arg;
      state.people[id] = { id, emoji: "🤷", background: "#fff" };
    });
  },
});

export const peopleActions = {
  getProfile,
  ...peopleSlice.actions,
};

export default peopleSlice.reducer;
