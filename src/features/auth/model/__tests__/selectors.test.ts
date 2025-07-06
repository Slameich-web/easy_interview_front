import { describe, it, expect } from "vitest";
import {
  selectAuth,
  selectIsAuth,
  selectAuthLoading,
  selectAuthError,
} from "../selectors";
import { RootState } from "../../../../app/store";

describe("auth selectors", () => {
  const createMockState = (authState = {}): RootState =>
    ({
      auth: {
        email: null,
        token: null,
        id: null,
        isLoading: false,
        error: null,
        ...authState,
      },
    }) as RootState;

  describe("selectAuth", () => {
    it("should select the auth state", () => {
      const authState = {
        email: "test@example.com",
        token: "mock-token",
        id: "user-123",
        isLoading: false,
        error: null,
      };

      const state = createMockState(authState);
      const result = selectAuth(state);

      expect(result).toEqual(authState);
    });
  });

  describe("selectIsAuth", () => {
    it("should return true when user has email", () => {
      const state = createMockState({ email: "test@example.com" });
      const result = selectIsAuth(state);

      expect(result).toBe(true);
    });

    it("should return false when user has no email", () => {
      const state = createMockState({ email: null });
      const result = selectIsAuth(state);

      expect(result).toBe(false);
    });

    it("should return false when email is empty string", () => {
      const state = createMockState({ email: "" });
      const result = selectIsAuth(state);

      expect(result).toBe(false);
    });
  });

  describe("selectAuthLoading", () => {
    it("should return loading state", () => {
      const state = createMockState({ isLoading: true });
      const result = selectAuthLoading(state);

      expect(result).toBe(true);
    });

    it("should return false when not loading", () => {
      const state = createMockState({ isLoading: false });
      const result = selectAuthLoading(state);

      expect(result).toBe(false);
    });
  });

  describe("selectAuthError", () => {
    it("should return error message", () => {
      const state = createMockState({ error: "Authentication failed" });
      const result = selectAuthError(state);

      expect(result).toBe("Authentication failed");
    });

    it("should return null when no error", () => {
      const state = createMockState({ error: null });
      const result = selectAuthError(state);

      expect(result).toBe(null);
    });
  });
});
