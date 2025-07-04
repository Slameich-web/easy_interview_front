import { useDispatch } from "react-redux";
import styles from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Form } from "../../../shared/ui/Form";
import { setUser } from "../../../features/user/store/slice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        })
      );
      navigate("/");
    });
  };

  return (
    <div className={styles.LoginPage}>
      <Form title="LoginPage" buttonTitle="Войти" handleClick={handleLogin} />
      <Link to="/register">Регистрация</Link>
    </div>
  );
};

export default LoginPage;
