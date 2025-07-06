import styles from "./RegisterPage.module.scss";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { RegisterForm } from "../../../features/auth";

const RegisterPage = () => {
  return (
    <div className={styles.RegisterPage}>
      <Typography variant="h3" className={styles.WelcomeText}>
        Создать аккаунт
      </Typography>
      <Typography variant="body1" className={styles.WelcomeText} sx={{ opacity: 0.9, mb: 2 }}>
        Присоединяйтесь к нам уже сегодня
      </Typography>
      
      <RegisterForm />
      
      <Link to="/login" className={styles.LoginLink}>
        Уже есть аккаунт? Войти
      </Link>
    </div>
  );
};

export default RegisterPage;