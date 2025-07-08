import { describe, it, expect } from "vitest";
import authReducer, {
  setLoading,
  setError,
  setUser,
  removeUser,
  AuthState,
} from "../authSlice";

describe("authSlice", () => {
  const initialState: AuthState = {
    email: null,
    token: null,
    id: null,
    isLoading: false,
    error: null,
    userData: null,
  };

  it("should return the initial state", () => {
    expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("setLoading", () => {
    it("should set loading to true and clear error", () => {
      const previousState: AuthState = {
        ...initialState,
        error: "Some error",
      };

      const actual = authReducer(previousState, setLoading(true));

      expect(actual.isLoading).toBe(true);
      expect(actual.error).toBe(null);
    });

    it("should set loading to false", () => {
      const previousState: AuthState = {
        ...initialState,
        isLoading: true,
      };

      const actual = authReducer(previousState, setLoading(false));

      expect(actual.isLoading).toBe(false);
    });
  });

  describe("setError", () => {
    it("should set error and stop loading", () => {
      const previousState: AuthState = {
        ...initialState,
        isLoading: true,
      };

      const actual = authReducer(
        previousState,
        setError("Authentication failed")
      );

      expect(actual.error).toBe("Authentication failed");
      expect(actual.isLoading).toBe(false);
    });
  });

  describe("setUser", () => {
    it("should set user data and clear loading/error", () => {
      const previousState: AuthState = {
        ...initialState,
        isLoading: true,
        error: "Some error",
      };

      const userData = {
        email: "test@example.com",
        token: "mock-token",
        id: "user-123",
      };

      const actual = authReducer(previousState, setUser(userData));

      expect(actual.email).toBe("test@example.com");
      expect(actual.token).toBe("mock-token");
      expect(actual.id).toBe("user-123");
      expect(actual.isLoading).toBe(false);
      expect(actual.error).toBe(null);
    });
  });

  describe("removeUser", () => {
    it("should clear all user data and reset state", () => {
      const previousState: AuthState = {
        email: "test@example.com",
        token: "mock-token",
        id: "user-123",
        isLoading: true,
        error: "Some error",
        userData: null,
      };

      const actual = authReducer(previousState, removeUser());

      expect(actual.email).toBe(null);
      expect(actual.token).toBe(null);
      expect(actual.id).toBe(null);
      expect(actual.isLoading).toBe(false);
      expect(actual.error).toBe(null);
    });
  });
});
