import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import Button from "../../../shared/ui/Button";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../features/user/store/slice";
import { authService } from "../../../services/auth";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";

const MainPage = () => {
  const { isAuth, email } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      await authService.signOut();
      dispatch(removeUser());
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <p>Вы вошли как: {email}</p>
      <Button 
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? <LoadingSpinner size={20} /> : "Выйти"}
      </Button>
    </div>
  );
};

export default MainPage;