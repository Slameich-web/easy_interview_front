import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/store/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
