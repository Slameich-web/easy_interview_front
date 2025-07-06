import { Link } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { RegisterForm } from "../../../features/auth";

const PageContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "32px",
  padding: "20px",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  "& > *": {
    position: "relative",
    zIndex: 2,
  },
});

const StyledLink = styled(Link)({
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 600,
  padding: "16px 32px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "25px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  letterSpacing: "0.5px",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)",
  },
});

const RegisterPage = () => {
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
          Создать аккаунт
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
          Присоединяйтесь к нам уже сегодня
        </Typography>
      </Box>

      <RegisterForm />

      <StyledLink to="/login">Уже есть аккаунт? Войти</StyledLink>
    </PageContainer>
  );
};

export default RegisterPage;
