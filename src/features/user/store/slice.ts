import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "../../../types/user";

const initialState: UserState = {
  email: null,
  token: null,
  id: null,
};

interface SetUserPayload {
  email: string;
  token: string;
  id: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<SetUserPayload>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;