import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../../shared/types/user";

export interface AuthState {
  email: string | null;
  token: string | null;
  id: string | null;
  userData: UserData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
  id: null,
  userData: null,
  isLoading: false,
  error: null,
};

interface SetUserPayload {
  email: string;
  token: string;
  id: string;
  userData?: UserData;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setUser(state, action: PayloadAction<SetUserPayload>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.userData = action.payload.userData || null;
      state.isLoading = false;
      state.error = null;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.userData = null;
      state.isLoading = false;
      state.error = null;
    },
    setUserData(state, action: PayloadAction<UserData>) {
      state.userData = action.payload;
    },
  },
});

export const { setLoading, setError, setUser, removeUser, setUserData } = authSlice.actions;
export default authSlice.reducer;