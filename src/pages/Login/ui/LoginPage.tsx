import { Typography } from "@mui/material";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import styles from "./LoginPage.module.scss";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={styles.LoginPage}>
      <Typography>Login</Typography>
      <Input placeholder="Login" />
      <Input placeholder="Password" />
      <Button>Login</Button>

      <Link to="/register">Регистрация</Link>
    </div>
  );
};

export default LoginPage;
