import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../shared/ui/Form";
import { setLoading, setError, setUser } from "../model/authSlice";
import { selectAuthLoading, selectAuthError } from "../model/selectors";
import { signUp } from "../api/authApi";

interface RegisterFormProps {
  isStudentRegistration?: boolean;
}

export const RegisterForm = ({ isStudentRegistration = false }: RegisterFormProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleRegister = async (
    email: string, 
    password: string, 
    confirmPassword?: string,
    groupId?: string,
    studentNumber?: string
  ) => {
    dispatch(setLoading(true));

    try {
      const { user } = await signUp({ 
        email, 
        password, 
        groupId,
        studentNumber,
        role: "student" // Все пользователи по умолчанию студенты
      });

      dispatch(
        setUser({
          email: user.email!,
          token: user.refreshToken,
          id: user.uid,
        })
      );

      navigate("/");
    } catch (error) {
      dispatch(
        setError(error instanceof Error ? error.message : "Произошла ошибка")
      );
    }
  };

  return (
    <Form
      title="Регистрация"
      buttonTitle="Зарегистрироваться"
      handleClick={handleRegister}
      isLoading={isLoading}
      error={error}
      showPasswordConfirmation={true}
      showGroupSelection={isStudentRegistration}
    />
  );
};
