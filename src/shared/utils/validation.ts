export interface ValidationResult {
  isValid: boolean;
  error: string;
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email.trim()) {
    return { isValid: false, error: "Email обязателен" };
  }
  
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Введите корректный email" };
  }
  
  return { isValid: true, error: "" };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password.trim()) {
    return { isValid: false, error: "Пароль обязателен" };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: "Пароль должен содержать минимум 6 символов" };
  }
  
  return { isValid: true, error: "" };
};

export const validateConfirmPassword = (
  confirmPassword: string, 
  password: string,
  isRequired: boolean = true
): ValidationResult => {
  if (!isRequired) {
    return { isValid: true, error: "" };
  }
  
  if (!confirmPassword.trim()) {
    return { isValid: false, error: "Подтверждение пароля обязательно" };
  }
  
  if (confirmPassword !== password) {
    return { isValid: false, error: "Пароли не совпадают" };
  }
  
  return { isValid: true, error: "" };
};

export const validateForm = (
  email: string,
  password: string,
  confirmPassword?: string,
  showPasswordConfirmation: boolean = false
) => {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);
  const confirmPasswordValidation = validateConfirmPassword(
    confirmPassword || "",
    password,
    showPasswordConfirmation
  );

  return {
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
    isFormValid: emailValidation.isValid && 
                 passwordValidation.isValid && 
                 confirmPasswordValidation.isValid
  };
};