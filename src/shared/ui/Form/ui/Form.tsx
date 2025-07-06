import { TextField, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ErrorMessage } from "../../ErrorMessage";
import { LoadingSpinner } from "../../LoadingSpinner";
import { Card } from "../../Card";
import Button from "../../Button";
import { useFormValidation } from "../../../hooks/useFormValidation";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: 500,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
      boxShadow:
        "0 0 0 4px rgba(255, 255, 255, 0.3), 0 8px 25px rgba(0, 0, 0, 0.15)",
    },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
      transform: "translateY(-2px)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#7f8c8d",
    fontWeight: 400,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2c3e50",
  },
  "& .MuiOutlinedInput-input": {
    padding: "18px 24px",
    color: "#2c3e50",
  },
  "& .MuiFormHelperText-root": {
    marginTop: "6px",
    fontSize: "13px",
    fontWeight: 500,
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#f44336",
  },
});

const FormCard = styled(Card)({
  width: "100%",
  maxWidth: "450px",
  padding: "48px 40px",
  background:
    "linear-gradient(145deg, #667eea 0%,rgb(109, 45, 173) 50%,rgb(117, 137, 250) 100%)",
  boxShadow: `
    0 25px 50px rgba(102, 126, 234, 0.25),
    0 10px 30px rgba(118, 75, 162, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(20px)",
  animation: "slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    animation: "shimmer 3s ease-in-out infinite",
    zIndex: -1,
  },
  "@keyframes slideInUp": {
    from: {
      opacity: 0,
      transform: "translateY(30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes shimmer": {
    "0%, 100%": {
      transform: "rotate(0deg) scale(1)",
      opacity: 0.3,
    },
    "50%": {
      transform: "rotate(180deg) scale(1.1)",
      opacity: 0.1,
    },
  },
});

const SubmitButton = styled(Button)({
  padding: "18px 32px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
  fontSize: "17px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginTop: "16px",
  height: "64px",
  boxShadow:
    "0 8px 25px rgba(255, 107, 107, 0.4), 0 4px 15px rgba(238, 90, 36, 0.2)",
  "&:hover:not(:disabled)": {
    transform: "translateY(-3px)",
    boxShadow:
      "0 12px 35px rgba(255, 107, 107, 0.5), 0 6px 20px rgba(238, 90, 36, 0.3)",
    background: "linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%)",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
  "&:disabled": {
    background: "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)",
    transform: "none",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
});

interface FormProps {
  title: string;
  handleClick: (
    email: string,
    password: string,
    confirmPassword?: string
  ) => Promise<void>;
  buttonTitle: string;
  isLoading?: boolean;
  error?: string | null;
  showPasswordConfirmation?: boolean;
}

const Form = ({
  title,
  handleClick,
  buttonTitle,
  isLoading = false,
  error,
  showPasswordConfirmation = false,
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
    isFormValid,
  } = useFormValidation({ showPasswordConfirmation });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields()) return;

    await handleClick(
      email,
      password,
      showPasswordConfirmation ? confirmPassword : undefined
    );
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2.5}>
      <FormCard>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#ffffff",
              textAlign: "center",
              fontWeight: 700,
              mb: 2,
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              fontSize: "2rem",
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </Typography>

          {error && (
            <ErrorMessage
              message={error}
              sx={{
                borderRadius: "12px",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "2px solid rgba(244, 67, 54, 0.3)",
                backdropFilter: "blur(10px)",
                mb: 1,
                boxShadow: "0 4px 15px rgba(244, 67, 54, 0.2)",
                "& .MuiAlert-message": {
                  color: "#d32f2f",
                },
              }}
            />
          )}

          <Box display="flex" flexDirection="column" gap={3}>
            <StyledTextField
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Введите ваш email"
              disabled={isLoading}
              error={!!emailError}
              helperText={emailError || " "}
              fullWidth
              variant="outlined"
            />

            <StyledTextField
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Введите ваш пароль"
              disabled={isLoading}
              error={!!passwordError}
              helperText={passwordError || " "}
              fullWidth
              variant="outlined"
            />

            {showPasswordConfirmation && (
              <StyledTextField
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Подтвердите пароль"
                disabled={isLoading}
                error={!!confirmPasswordError}
                helperText={confirmPasswordError || " "}
                fullWidth
                variant="outlined"
              />
            )}
          </Box>

          <SubmitButton
            type="submit"
            disabled={isLoading || !isFormValid}
            fullWidth
            size="large"
          >
            {isLoading ? (
              <Box display="flex" alignItems="center" justifyContent="center">
                <LoadingSpinner size={20} />
              </Box>
            ) : (
              buttonTitle
            )}
          </SubmitButton>
        </Box>
      </FormCard>
    </Box>
  );
};

export default Form;
