import styles from "./LoginPage.module.scss";
import { Link } from "react-router-dom";
import { LoginForm } from "../../../features/auth";

const LoginPage = () => {
  return (
    <div className={styles.LoginPage}>
      <LoginForm />
      <Link to="/register">Регистрация</Link>
    </div>
  );
};

export default LoginPage;