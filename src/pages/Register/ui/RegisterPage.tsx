import styles from "./RegisterPage.module.scss";
import { Link } from "react-router-dom";
import { RegisterForm } from "../../../features/auth";

const RegisterPage = () => {
  return (
    <div className={styles.RegisterPage}>
      <RegisterForm />
      <Link to="/login">Вход</Link>
    </div>
  );
};

export default RegisterPage;