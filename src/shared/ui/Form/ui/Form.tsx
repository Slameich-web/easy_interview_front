import { Typography, Box } from "@mui/material";
import { ErrorMessage } from "../../ErrorMessage";
import { LoadingSpinner } from "../../LoadingSpinner";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { useStudentForm } from "../../../hooks/useStudentForm";
import { StudentFields } from "../../StudentFields";
import { StyledTextField, FormCard } from "../../StyledComponents";
import { SubmitButton } from "../../StyledComponents/SubmitButton";

interface FormProps {
  title: string;
  handleClick: (
    email: string,
    password: string,
    confirmPassword?: string,
    groupId?: string,
    studentNumber?: string
  ) => Promise<void>;
  buttonTitle: string;
  isLoading?: boolean;
  error?: string | null;
  showPasswordConfirmation?: boolean;
  showGroupSelection?: boolean;
  isStudentRegistration?: boolean;
}

const Form = ({
  title,
  handleClick,
  buttonTitle,
  isLoading = false,
  error,
  showPasswordConfirmation = false,
  showGroupSelection = false,
  isStudentRegistration = false,
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

  const {
    selectedGroup,
    studentNumber,
    groupError,
    studentNumberError,
    handleGroupChange,
    handleStudentNumberChange,
    validateStudentFields,
    isStudentFormValid,
  } = useStudentForm({ isRequired: isStudentRegistration });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAllFields() || !validateStudentFields()) return;

    await handleClick(
      email,
      password,
      showPasswordConfirmation ? confirmPassword : undefined,
      showGroupSelection ? selectedGroup : undefined,
      showGroupSelection ? studentNumber : undefined
    );
  };

  const isFormValidWithGroup = isFormValid && isStudentFormValid;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" p={2.5}>
      <FormCard>
        <Box
          style={{ minWidth: "360px" }}
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

            {showGroupSelection && (
              <StudentFields
                studentNumber={studentNumber}
                selectedGroup={selectedGroup}
                studentNumberError={studentNumberError}
                groupError={groupError}
                onStudentNumberChange={handleStudentNumberChange}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                onGroupChange={handleGroupChange}
                disabled={isLoading}
                isRequired={isStudentRegistration}
              />
            )}
          </Box>

          <SubmitButton
            type="submit"
            disabled={isLoading || !isFormValidWithGroup}
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
