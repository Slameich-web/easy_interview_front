import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Firebase
vi.mock("../firebase.ts", () => ({}));

// Mock Firebase Auth
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
}));
