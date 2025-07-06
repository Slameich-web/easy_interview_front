import { useState, useCallback } from "react";
import { validateEmail, validatePassword, validateConfirmPassword } from "../utils/validation";

interface UseFormValidationProps {
  showPasswordConfirmation?: boolean;
}

export const useFormValidation = ({ showPasswordConfirmation = false }: UseFormValidationProps = {}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    if (emailError) {
      const validation = validateEmail(value);
      setEmailError(validation.error);
    }
  }, [emailError]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    
    if (passwordError) {
      const validation = validatePassword(value);
      setPasswordError(validation.error);
    }
    
    if (showPasswordConfirmation && confirmPassword) {
      const confirmValidation = validateConfirmPassword(confirmPassword, value, showPasswordConfirmation);
      setConfirmPasswordError(confirmValidation.error);
    }
  }, [passwordError, showPasswordConfirmation, confirmPassword]);

  const handleConfirmPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (confirmPasswordError) {
      const validation = validateConfirmPassword(value, password, showPasswordConfirmation);
      setConfirmPasswordError(validation.error);
    }
  }, [confirmPasswordError, password, showPasswordConfirmation]);

  const validateAllFields = useCallback(() => {
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    const confirmPasswordValidation = validateConfirmPassword(
      confirmPassword,
      password,
      showPasswordConfirmation
    );

    setEmailError(emailValidation.error);
    setPasswordError(passwordValidation.error);
    setConfirmPasswordError(confirmPasswordValidation.error);

    return emailValidation.isValid && 
           passwordValidation.isValid && 
           confirmPasswordValidation.isValid;
  }, [email, password, confirmPassword, showPasswordConfirmation]);

  const isFormValid = email.trim() && 
    password.trim() && 
    !emailError && 
    !passwordError && 
    (!showPasswordConfirmation || (confirmPassword.trim() && !confirmPasswordError));

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
  }, []);

  return {
    // Values
    email,
    password,
    confirmPassword,
    
    // Errors
    emailError,
    passwordError,
    confirmPasswordError,
    
    // Handlers
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    
    // Validation
    validateAllFields,
    isFormValid,
    resetForm
  };
};