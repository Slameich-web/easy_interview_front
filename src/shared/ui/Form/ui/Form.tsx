import Typography from "@mui/material/Typography";
import styles from "./Form.module.scss";
import { ErrorMessage } from "../../ErrorMessage";
import { LoadingSpinner } from "../../LoadingSpinner";
import { useFormValidation } from "../../../hooks/useFormValidation";

interface FormProps {
  title: string;
  handleClick: (email: string, password: string, confirmPassword?: string) => Promise<void>;
  buttonTitle: string;
  isLoading?: boolean;
  error?: string;
  showPasswordConfirmation?: boolean;
}

const Form = ({ 
  title, 
  handleClick, 
  buttonTitle, 
  isLoading = false, 
  error,
  showPasswordConfirmation = false 
}: FormProps) => {
  const {
    email,
    password,
    confirmPassword,
    emailError,
    passwordError,
    confirmPasswordError,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    validateAllFields,
    isFormValid
  } = useFormValidation({ showPasswordConfirmation });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAllFields()) return;
    
    await handleClick(email, password, showPasswordConfirmation ? confirmPassword : undefined);
  };

  // Определяем класс формы для разных типов
  const formTypeClass = showPasswordConfirmation ? styles.RegisterForm : styles.LoginForm;

  return (
    <div className={styles.FormContainer}>
      <form className={`${styles.Form} ${formTypeClass}`} onSubmit={handleSubmit}>
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
        
        <div className={styles.FormContent}>
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
            <Typography 
              variant="caption" 
              className={styles.ErrorText}
              sx={{ color: emailError ? '#f44336' : 'transparent' }}
            >
              {emailError || '\u00A0'} {/* Неразрывный пробел для сохранения высоты */}
            </Typography>
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
            <Typography 
              variant="caption" 
              className={styles.ErrorText}
              sx={{ color: passwordError ? '#f44336' : 'transparent' }}
            >
              {passwordError || '\u00A0'}
            </Typography>
          </div>

          {showPasswordConfirmation && (
            <div className={styles.InputWrapper}>
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Подтвердите пароль"
                className={styles.InputField}
                disabled={isLoading}
                style={{
                  borderColor: confirmPasswordError ? '#f44336' : undefined
                }}
              />
              <Typography 
                variant="caption" 
                className={styles.ErrorText}
                sx={{ color: confirmPasswordError ? '#f44336' : 'transparent' }}
              >
                {confirmPasswordError || '\u00A0'}
              </Typography>
            </div>
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
    </div>
  );
};

export default Form;