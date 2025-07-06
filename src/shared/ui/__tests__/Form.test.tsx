import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "../Form";

describe("Form", () => {
  const defaultProps = {
    title: "Test Form",
    buttonTitle: "Submit",
    handleClick: vi.fn(),
  };

  it("should render form with title and button", () => {
    render(<Form {...defaultProps} />);

    expect(screen.getByText("Test Form")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Введите ваш email")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Введите ваш пароль")
    ).toBeInTheDocument();
  });

  it("should render password confirmation field when showPasswordConfirmation is true", () => {
    render(<Form {...defaultProps} showPasswordConfirmation={true} />);

    expect(
      screen.getByPlaceholderText("Подтвердите пароль")
    ).toBeInTheDocument();
  });

  it("should not render password confirmation field when showPasswordConfirmation is false", () => {
    render(<Form {...defaultProps} showPasswordConfirmation={false} />);

    expect(
      screen.queryByPlaceholderText("Подтвердите пароль")
    ).not.toBeInTheDocument();
  });

  it("should display error message when error prop is provided", () => {
    render(<Form {...defaultProps} error="Test error message" />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("should disable form when loading", () => {
    render(<Form {...defaultProps} isLoading={true} />);

    const emailInput = screen.getByPlaceholderText("Введите ваш email");
    const passwordInput = screen.getByPlaceholderText("Введите ваш пароль");
    const submitButton = screen.getByRole("button");

    expect(emailInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
    expect(submitButton).toBeDisabled();
  });

  it("should show loading spinner when loading", () => {
    render(<Form {...defaultProps} isLoading={true} />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should validate email field", async () => {
    const user = userEvent.setup();
    render(<Form {...defaultProps} />);

    const emailInput = screen.getByPlaceholderText("Введите ваш email");

    await user.type(emailInput, "invalid-email");

    await waitFor(() => {
      expect(screen.getByText("Введите корректный email")).toBeInTheDocument();
    });
  });

  it("should validate password field", async () => {
    const user = userEvent.setup();
    render(<Form {...defaultProps} />);

    const passwordInput = screen.getByPlaceholderText("Введите ваш пароль");

    await user.type(passwordInput, "123");

    await waitFor(() => {
      expect(
        screen.getByText("Пароль должен содержать минимум 6 символов")
      ).toBeInTheDocument();
    });
  });

  it("should validate password confirmation field", async () => {
    const user = userEvent.setup();
    render(<Form {...defaultProps} showPasswordConfirmation={true} />);

    const passwordInput = screen.getByPlaceholderText("Введите ваш пароль");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Подтвердите пароль");

    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "different123");

    await waitFor(() => {
      expect(screen.getByText("Пароли не совпадают")).toBeInTheDocument();
    });
  });

  it("should submit form with valid data", async () => {
    const user = userEvent.setup();
    const mockHandleClick = vi.fn().mockResolvedValue(undefined);

    render(<Form {...defaultProps} handleClick={mockHandleClick} />);

    const emailInput = screen.getByPlaceholderText("Введите ваш email");
    const passwordInput = screen.getByPlaceholderText("Введите ваш пароль");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockHandleClick).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
        undefined
      );
    });
  });

  it("should submit form with password confirmation", async () => {
    const user = userEvent.setup();
    const mockHandleClick = vi.fn().mockResolvedValue(undefined);

    render(
      <Form
        {...defaultProps}
        handleClick={mockHandleClick}
        showPasswordConfirmation={true}
      />
    );

    const emailInput = screen.getByPlaceholderText("Введите ваш email");
    const passwordInput = screen.getByPlaceholderText("Введите ваш пароль");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Подтвердите пароль");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockHandleClick).toHaveBeenCalledWith(
        "test@example.com",
        "password123",
        "password123"
      );
    });
  });

  it("should disable submit button when form is invalid", () => {
    render(<Form {...defaultProps} />);

    const submitButton = screen.getByRole("button", { name: "Submit" });

    expect(submitButton).toBeDisabled();
  });
});
