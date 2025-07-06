/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { signIn, signUp, logout } from "../authApi";

// Mock Firebase Auth
vi.mock("firebase/auth");

const mockGetAuth = vi.mocked(getAuth);
const mockSignInWithEmailAndPassword = vi.mocked(signInWithEmailAndPassword);
const mockCreateUserWithEmailAndPassword = vi.mocked(
  createUserWithEmailAndPassword
);
const mockSignOut = vi.mocked(signOut);

describe("authApi", () => {
  const mockAuth = { currentUser: null };
  const mockUser = {
    uid: "user-123",
    email: "test@example.com",
    refreshToken: "mock-refresh-token",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetAuth.mockReturnValue(mockAuth as any);
  });

  describe("signIn", () => {
    it("should sign in user successfully", async () => {
      const mockResult = { user: mockUser };
      mockSignInWithEmailAndPassword.mockResolvedValue(mockResult as any);

      const credentials = {
        email: "test@example.com",
        password: "password123",
      };
      const result = await signIn(credentials);

      expect(mockGetAuth).toHaveBeenCalled();
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        "test@example.com",
        "password123"
      );
      expect(result).toEqual({ user: mockUser });
    });

    it("should throw error when sign in fails", async () => {
      const mockError = new Error("Invalid credentials");
      mockSignInWithEmailAndPassword.mockRejectedValue(mockError);

      const credentials = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      await expect(signIn(credentials)).rejects.toThrow(
        "Ошибка входа: Invalid credentials"
      );
    });

    it("should handle unknown error", async () => {
      mockSignInWithEmailAndPassword.mockRejectedValue("Unknown error");

      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      await expect(signIn(credentials)).rejects.toThrow(
        "Ошибка входа: Неизвестная ошибка"
      );
    });
  });

  describe("signUp", () => {
    it("should sign up user successfully", async () => {
      const mockResult = { user: mockUser };
      mockCreateUserWithEmailAndPassword.mockResolvedValue(mockResult as any);

      const credentials = {
        email: "test@example.com",
        password: "password123",
      };
      const result = await signUp(credentials);

      expect(mockGetAuth).toHaveBeenCalled();
      expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalledWith(
        mockAuth,
        "test@example.com",
        "password123"
      );
      expect(result).toEqual({ user: mockUser });
    });

    it("should throw error when sign up fails", async () => {
      const mockError = new Error("Email already in use");
      mockCreateUserWithEmailAndPassword.mockRejectedValue(mockError);

      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      await expect(signUp(credentials)).rejects.toThrow(
        "Ошибка регистрации: Email already in use"
      );
    });

    it("should handle unknown error", async () => {
      mockCreateUserWithEmailAndPassword.mockRejectedValue("Unknown error");

      const credentials = {
        email: "test@example.com",
        password: "password123",
      };

      await expect(signUp(credentials)).rejects.toThrow(
        "Ошибка регистрации: Неизвестная ошибка"
      );
    });
  });

  describe("logout", () => {
    it("should logout user successfully", async () => {
      mockSignOut.mockResolvedValue(undefined);

      await logout();

      expect(mockGetAuth).toHaveBeenCalled();
      expect(mockSignOut).toHaveBeenCalledWith(mockAuth);
    });

    it("should throw error when logout fails", async () => {
      const mockError = new Error("Logout failed");
      mockSignOut.mockRejectedValue(mockError);

      await expect(logout()).rejects.toThrow("Ошибка выхода: Logout failed");
    });

    it("should handle unknown error", async () => {
      mockSignOut.mockRejectedValue("Unknown error");

      await expect(logout()).rejects.toThrow(
        "Ошибка выхода: Неизвестная ошибка"
      );
    });
  });
});
