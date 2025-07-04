import { useDispatch } from "react-redux";
import { useState } from "react";
import styles from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../../../shared/ui/Form";
import { setUser } from "../../../features/user/store/slice";
import { authService } from "../../../services/auth";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      const { user } = await authService.signIn({ email, password });
      
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
    <div className={styles.LoginPage}>
      <Form 
        title="Вход" 
        buttonTitle="Войти" 
        handleClick={handleLogin}
        isLoading={isLoading}
        error={error}
      />
      <Link to="/register">Регистрация</Link>
    </div>
  );
};

export default LoginPage;