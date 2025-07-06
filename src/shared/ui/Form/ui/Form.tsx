import Typography from "@mui/material/Typography";
import styles from "./Form.module.scss";
import { useState } from "react";
import { ErrorMessage } from "../../ErrorMessage";
import { LoadingSpinner } from "../../LoadingSpinner";

interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => Promise<void>;
  buttonTitle: string;
  isLoading?: boolean;
  error?: string;
}

const Form = ({ title, handleClick, buttonTitle, isLoading = false, error }: FormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setEmailError("Email обязателен");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Введите корректный email");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) {
      setPasswordError("Пароль обязателен");
      return false;
    }
    if (password.length < 6) {
      setPasswordError("Пароль должен содержать минимум 6 символов");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) validateEmail(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordError) validatePassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) return;
    
    await handleClick(email, password);
  };

  const isFormValid = email.trim() && password.trim() && !emailError && !passwordError;

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <Typography variant="h4" className={styles.FormTitle}>
        {title}
      </Typography>
      
      {error && (
        <ErrorMessage 
          message={error} 
          className={styles.ErrorMessage}
          sx={{ 
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            border: '1px solid rgba(244, 67, 54, 0.3)',
            color: '#d32f2f'
          }} 
        />
      )}
      
      <div className={styles.InputWrapper}>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Введите ваш email"
          className={styles.InputField}
          disabled={isLoading}
          style={{
            borderColor: emailError ? '#f44336' : undefined
          }}
        />
        {emailError && (
          <Typography variant="caption" sx={{ color: '#f44336', mt: 0.5, display: 'block' }}>
            {emailError}
          </Typography>
        )}
      </div>

      <div className={styles.InputWrapper}>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Введите ваш пароль"
          className={styles.InputField}
          disabled={isLoading}
          style={{
            borderColor: passwordError ? '#f44336' : undefined
          }}
        />
        {passwordError && (
          <Typography variant="caption" sx={{ color: '#f44336', mt: 0.5, display: 'block' }}>
            {passwordError}
          </Typography>
        )}
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading || !isFormValid}
        className={styles.SubmitButton}
      >
        {isLoading ? (
          <div className={styles.LoadingSpinner}>
            <LoadingSpinner size={20} />
          </div>
        ) : (
          buttonTitle
        )}
      </button>
    </form>
  );
};

export default Form;