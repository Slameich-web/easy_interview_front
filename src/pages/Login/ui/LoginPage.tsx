import { Typography, Box } from "@mui/material";
import { LoginForm } from "../../../features/auth";
import { PageContainer, StyledLink } from "../../../shared/ui/StyledComponents";

const LoginPage = () => {
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
          Добро пожаловать!
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
          Войдите в свой аккаунт, чтобы продолжить
        </Typography>
      </Box>

      <LoginForm />

      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <StyledLink to="/register">Нет аккаунта? Зарегистрироваться</StyledLink>
        <StyledLink to="/registerStudent">Регистрация студента</StyledLink>
      </Box>
    </PageContainer>
  );
};

export default LoginPage;
