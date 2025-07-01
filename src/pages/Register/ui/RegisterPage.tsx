import { Typography } from "@mui/material";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";
import styles from "./RegisterPage.module.scss";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className={styles.RegisterPage}>
      <Typography>Register</Typography>

      <Input placeholder="Login" />
      <Input placeholder="Password" />
      <Button>Зарегистрироватся</Button>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default RegisterPage;
