import styles from "./LoginPage.module.scss";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { LoginForm } from "../../../features/auth";

const LoginPage = () => {
  return (
    <div className={styles.LoginPage}>
      <Typography variant="h3" className={styles.WelcomeText}>
        Добро пожаловать!
      </Typography>
      <Typography variant="body1" className={styles.WelcomeText} sx={{ opacity: 0.9, mb: 2 }}>
        Войдите в свой аккаунт, чтобы продолжить
      </Typography>
      
      <LoginForm />
      
      <Link to="/register" className={styles.RegisterLink}>
        Нет аккаунта? Зарегистрироваться
      </Link>
    </div>
  );
};

export default LoginPage;