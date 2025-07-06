import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../features/auth/model/authSlice";
import { useAuth } from "../useAuth";

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        email: null,
        token: null,
        id: null,
        isLoading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

const renderWithProvider = (store: ReturnType<typeof createMockStore>) => {
  return renderHook(() => useAuth(), {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
  });
};

describe("useAuth", () => {
  it("should return initial auth state", () => {
    const store = createMockStore();
    const { result } = renderWithProvider(store);

    expect(result.current.isAuth).toBe(false);
    expect(result.current.email).toBe(null);
    expect(result.current.token).toBe(null);
    expect(result.current.id).toBe(null);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should return authenticated state when user is logged in", () => {
    const store = createMockStore({
      email: "test@example.com",
      token: "mock-token",
      id: "user-123",
      isLoading: false,
      error: null,
    });

    const { result } = renderWithProvider(store);

    expect(result.current.isAuth).toBe(true);
    expect(result.current.email).toBe("test@example.com");
    expect(result.current.token).toBe("mock-token");
    expect(result.current.id).toBe("user-123");
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should return loading state", () => {
    const store = createMockStore({
      isLoading: true,
    });

    const { result } = renderWithProvider(store);

    expect(result.current.isLoading).toBe(true);
  });

  it("should return error state", () => {
    const store = createMockStore({
      error: "Authentication failed",
    });

    const { result } = renderWithProvider(store);

    expect(result.current.error).toBe("Authentication failed");
  });
});
