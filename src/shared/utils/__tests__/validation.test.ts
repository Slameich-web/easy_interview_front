import { describe, it, expect } from "vitest";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateForm,
} from "../validation";

describe("validateEmail", () => {
  it("should return error for empty email", () => {
    const result = validateEmail("");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Email обязателен");
  });

  it("should return error for whitespace-only email", () => {
    const result = validateEmail("   ");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Email обязателен");
  });

  it("should return error for invalid email format", () => {
    const invalidEmails = [
      "invalid",
      "invalid@",
      "@invalid.com",
      "invalid@.com",
      "invalid@com",
      "invalid.com",
      "invalid@domain",
      "invalid@domain.",
    ];

    invalidEmails.forEach((email) => {
      const result = validateEmail(email);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Введите корректный email");
    });
  });

  it("should return valid for correct email formats", () => {
    const validEmails = [
      "test@example.com",
      "user.name@domain.co.uk",
      "user+tag@example.org",
      "user123@test-domain.com",
      "a@b.co",
    ];

    validEmails.forEach((email) => {
      const result = validateEmail(email);
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });
  });
});

describe("validatePassword", () => {
  it("should return error for empty password", () => {
    const result = validatePassword("");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Пароль обязателен");
  });

  it("should return error for whitespace-only password", () => {
    const result = validatePassword("   ");
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Пароль обязателен");
  });

  it("should return error for password shorter than 6 characters", () => {
    const shortPasswords = ["1", "12", "123", "1234", "12345"];

    shortPasswords.forEach((password) => {
      const result = validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe("Пароль должен содержать минимум 6 символов");
    });
  });

  it("should return valid for password with 6 or more characters", () => {
    const validPasswords = [
      "123456",
      "password",
      "mySecurePass123",
      "a".repeat(100),
    ];

    validPasswords.forEach((password) => {
      const result = validatePassword(password);
      expect(result.isValid).toBe(true);
      expect(result.error).toBe("");
    });
  });
});

describe("validateConfirmPassword", () => {
  it("should return valid when not required", () => {
    const result = validateConfirmPassword("anything", "different", false);
    expect(result.isValid).toBe(true);
    expect(result.error).toBe("");
  });

  it("should return error for empty confirm password when required", () => {
    const result = validateConfirmPassword("", "password123", true);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Подтверждение пароля обязательно");
  });

  it("should return error for whitespace-only confirm password when required", () => {
    const result = validateConfirmPassword("   ", "password123", true);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Подтверждение пароля обязательно");
  });

  it("should return error when passwords do not match", () => {
    const result = validateConfirmPassword("password123", "different123", true);
    expect(result.isValid).toBe(false);
    expect(result.error).toBe("Пароли не совпадают");
  });

  it("should return valid when passwords match", () => {
    const password = "mySecurePassword123";
    const result = validateConfirmPassword(password, password, true);
    expect(result.isValid).toBe(true);
    expect(result.error).toBe("");
  });
});

describe("validateForm", () => {
  it("should validate all fields for login form", () => {
    const result = validateForm("test@example.com", "password123");

    expect(result.email.isValid).toBe(true);
    expect(result.password.isValid).toBe(true);
    expect(result.confirmPassword.isValid).toBe(true);
    expect(result.isFormValid).toBe(true);
  });

  it("should validate all fields for registration form", () => {
    const result = validateForm(
      "test@example.com",
      "password123",
      "password123",
      true
    );

    expect(result.email.isValid).toBe(true);
    expect(result.password.isValid).toBe(true);
    expect(result.confirmPassword.isValid).toBe(true);
    expect(result.isFormValid).toBe(true);
  });

  it("should return invalid when any field is invalid", () => {
    const result = validateForm("invalid-email", "123", "different", true);

    expect(result.email.isValid).toBe(false);
    expect(result.password.isValid).toBe(false);
    expect(result.confirmPassword.isValid).toBe(false);
    expect(result.isFormValid).toBe(false);
  });

  it("should ignore confirm password validation when not required", () => {
    const result = validateForm("test@example.com", "password123", "different");

    expect(result.email.isValid).toBe(true);
    expect(result.password.isValid).toBe(true);
    expect(result.confirmPassword.isValid).toBe(true);
    expect(result.isFormValid).toBe(true);
  });
});
