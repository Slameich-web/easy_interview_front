import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  email: string | null;
  token: string | null;
  id: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  email: null,
  token: null,
  id: null,
  isLoading: false,
  error: null,
};

interface SetUserPayload {
  email: string;
  token: string;
  id: string;
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
      state.isLoading = false;
      state.error = null;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setError, setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;