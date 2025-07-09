import { Typography, Box } from "@mui/material";
import { RegisterForm } from "../../../features/auth";
import { PageContainer, StyledLink } from "../../../shared/ui/StyledComponents";

interface RegisterPageProps {
  isStudentRegistration?: boolean;
}

const RegisterPage = ({ isStudentRegistration = false }: RegisterPageProps) => {
  return (
    <PageContainer>
      <Box textAlign="center">
        <Typography
          variant="h3"
          sx={{
            color: "#ffffff",
            mb: 1,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            fontWeight: 600,
          }}
        >
          {isStudentRegistration ? "Регистрация студента" : "Создать аккаунт"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#ffffff",
            opacity: 0.9,
            mb: 2,
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
            fontWeight: 600,
          }}
        >
          {isStudentRegistration
            ? "Заполните данные для регистрации в системе"
            : "Присоединяйтесь к нам уже сегодня"}
        </Typography>
      </Box>

      <RegisterForm isStudentRegistration={isStudentRegistration} />

      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <StyledLink to="/login">Уже есть аккаунт? Войти</StyledLink>
        {!isStudentRegistration && (
          <StyledLink to="/registerStudent">Регистрация студента</StyledLink>
        )}
        {isStudentRegistration && (
          <StyledLink to="/register">Обычная регистрация</StyledLink>
        )}
      </Box>
    </PageContainer>
  );
};

export default RegisterPage;
