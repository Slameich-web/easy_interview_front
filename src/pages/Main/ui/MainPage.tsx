import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { LogoutButton } from "../../../features/auth";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";

const MainPage = () => {
  const { isAuth, email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  if (!isAuth) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Добро пожаловать!</h1>
      <p>Вы вошли как: {email}</p>
      <LogoutButton userEmail={email} />
    </div>
  );
};

export default MainPage;