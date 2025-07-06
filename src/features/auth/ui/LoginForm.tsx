import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../shared/ui/Form";
import { setLoading, setError, setUser } from "../model/authSlice";
import { selectAuthLoading, selectAuthError } from "../model/selectors";
import { signIn } from "../api/authApi";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleLogin = async (email: string, password: string) => {
    dispatch(setLoading(true));
    
    try {
      const { user } = await signIn({ email, password });
      
      dispatch(
        setUser({
          email: user.email!,
          token: user.refreshToken,
          id: user.uid,
        })
      );
      
      navigate("/");
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : "Произошла ошибка"));
    }
  };

  return (
    <Form 
      title="Вход" 
      buttonTitle="Войти" 
      handleClick={handleLogin}
      isLoading={isLoading}
      error={error}
      showPasswordConfirmation={false}
    />
  );
};