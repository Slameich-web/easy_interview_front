import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useFormValidation } from "../useFormValidation";

describe("useFormValidation", () => {
  describe("without password confirmation", () => {
    it("should initialize with empty values and no errors", () => {
      const { result } = renderHook(() => useFormValidation());

      expect(result.current.email).toBe("");
      expect(result.current.password).toBe("");
      expect(result.current.confirmPassword).toBe("");
      expect(result.current.emailError).toBe("");
      expect(result.current.passwordError).toBe("");
      expect(result.current.confirmPasswordError).toBe("");
    });

    it("should validate email on change", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.handleEmailChange({
          target: { value: "test@example.com" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.email).toBe("test@example.com");
      expect(result.current.emailError).toBe("");
    });

    it("should show email error for invalid email", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.handleEmailChange({
          target: { value: "invalid-email" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.email).toBe("invalid-email");
      expect(result.current.emailError).toBe("Введите корректный email");
    });

    it("should validate password on change", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.handlePasswordChange({
          target: { value: "password123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.password).toBe("password123");
      expect(result.current.passwordError).toBe("");
    });

    it("should show password error for short password", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.handlePasswordChange({
          target: { value: "123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.password).toBe("123");
      expect(result.current.passwordError).toBe(
        "Пароль должен содержать минимум 6 символов"
      );
    });

    it("should validate all fields correctly", () => {
      const { result } = renderHook(() => useFormValidation());

      act(() => {
        result.current.handleEmailChange({
          target: { value: "test@example.com" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handlePasswordChange({
          target: { value: "password123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.isFormValid).toBe(true);

      let isValid;
      act(() => {
        isValid = result.current.validateAllFields();
      });

      expect(isValid).toBe(true);
    });
  });

  describe("with password confirmation", () => {
    it("should validate confirm password", () => {
      const { result } = renderHook(() =>
        useFormValidation({ showPasswordConfirmation: true })
      );

      act(() => {
        result.current.handlePasswordChange({
          target: { value: "password123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleConfirmPasswordChange({
          target: { value: "password123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.confirmPassword).toBe("password123");
      expect(result.current.confirmPasswordError).toBe("");
    });

    it("should show error when passwords do not match", () => {
      const { result } = renderHook(() =>
        useFormValidation({ showPasswordConfirmation: true })
      );

      act(() => {
        result.current.handlePasswordChange({
          target: { value: "password123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleConfirmPasswordChange({
          target: { value: "different123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.confirmPasswordError).toBe("Пароли не совпадают");
    });

    it("should revalidate confirm password when main password changes", () => {
      const { result } = renderHook(() =>
        useFormValidation({ showPasswordConfirmation: true })
      );

      // Set initial passwords that match
      act(() => {
        result.current.handlePasswordChange({
          target: { value: "password123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleConfirmPasswordChange({
          target: { value: "password123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.confirmPasswordError).toBe("");

      // Change main password
      act(() => {
        result.current.handlePasswordChange({
          target: { value: "newpassword123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.confirmPasswordError).toBe("Пароли не совпадают");
    });

    it("should validate complete registration form", () => {
      const { result } = renderHook(() =>
        useFormValidation({ showPasswordConfirmation: true })
      );

      act(() => {
        result.current.handleEmailChange({
          target: { value: "test@example.com" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handlePasswordChange({
          target: { value: "password123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleConfirmPasswordChange({
          target: { value: "password123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.isFormValid).toBe(true);
    });
  });

  describe("resetForm", () => {
    it("should reset all form values and errors", () => {
      const { result } = renderHook(() =>
        useFormValidation({ showPasswordConfirmation: true })
      );

      // Fill form with data and errors
      act(() => {
        result.current.handleEmailChange({
          target: { value: "invalid-email" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handlePasswordChange({
          target: { value: "123" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleConfirmPasswordChange({
          target: { value: "different" },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      // Reset form
      act(() => {
        result.current.resetForm();
      });

      expect(result.current.email).toBe("");
      expect(result.current.password).toBe("");
      expect(result.current.confirmPassword).toBe("");
      expect(result.current.emailError).toBe("");
      expect(result.current.passwordError).toBe("");
      expect(result.current.confirmPasswordError).toBe("");
    });
  });
});
