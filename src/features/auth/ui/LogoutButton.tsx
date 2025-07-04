import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../shared/ui/Button";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { removeUser } from "../model/authSlice";
import { logout } from "../api/authApi";

interface LogoutButtonProps {
  userEmail?: string | null;
}

export const LogoutButton = ({ userEmail }: LogoutButtonProps) => {
  const dispatch = useDispatch();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      await logout();
      dispatch(removeUser());
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Button 
      onClick={handleLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? <LoadingSpinner size={20} /> : `Выйти ${userEmail ? `(${userEmail})` : ''}`}
    </Button>
  );
};