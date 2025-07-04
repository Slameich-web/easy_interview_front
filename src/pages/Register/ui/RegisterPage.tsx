import styles from "./RegisterPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { Form } from "../../../shared/ui/Form";
import { setUser } from "../../../features/user/store/slice";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
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
    <div className={styles.RegisterPage}>
      <Form
        title="RegisterPage"
        buttonTitle="Зарегистрироватся"
        handleClick={handleRegister}
      />

      <Link to="/login">Login</Link>
    </div>
  );
};

export default RegisterPage;
