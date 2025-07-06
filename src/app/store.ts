import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/model/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["auth/setUser"],
        ignoredPaths: ["auth.token"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
