import { useState } from "react";
import styles from "./RegisterPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form } from "../../../shared/ui/Form";
import { setUser } from "../../../features/user/store/slice";
import { authService } from "../../../services/auth";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      const { user } = await authService.signUp({ email, password });
      
      dispatch(
        setUser({
          email: user.email!,
          token: user.refreshToken,
          id: user.uid,
        })
      );
      
      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.RegisterPage}>
      <Form
        title="Регистрация"
        buttonTitle="Зарегистрироваться"
        handleClick={handleRegister}
        isLoading={isLoading}
        error={error}
      />

      <Link to="/login">Вход</Link>
    </div>
  );
};

export default RegisterPage;