import { RootState } from "../../../app/store";

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuth = (state: RootState) => !!state.auth.email;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;