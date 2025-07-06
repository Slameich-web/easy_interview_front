import { useState } from "react";
import { useDispatch } from "react-redux";
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
    <button 
      onClick={handleLogout}
      disabled={isLoggingOut}
      style={{
        padding: '12px 24px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: isLoggingOut ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '120px',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        if (!isLoggingOut) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isLoggingOut) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {isLoggingOut ? (
        <>
          <LoadingSpinner size={16} />
          Выход...
        </>
      ) : (
        <>
          🚪 Выйти
        </>
      )}
    </button>
  );
};