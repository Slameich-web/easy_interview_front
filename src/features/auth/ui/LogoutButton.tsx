import { useState } from "react";
import { useDispatch } from "react-redux";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import { IconButton } from "../../../shared/ui/IconButton";
import { removeUser } from "../model/authSlice";
import { logout } from "../api/authApi";
import { Box, Typography } from "@mui/material";

export const LogoutButton = () => {
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
    <IconButton onClick={handleLogout} disabled={isLoggingOut}>
      <Box onClick={handleLogout} display="flex" alignItems="center" gap={1}>
        {isLoggingOut ? (
          <>
            <LoadingSpinner size={16} />
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                display: { xs: "none", sm: "block" }
              }}
            >
              Выход...
            </Typography>
          </>
        ) : (
          <>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                display: { xs: "none", sm: "block" }
              }}
            >
              🚪 Выйти
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600,
                display: { xs: "block", sm: "none" },
                fontSize: "1.2rem"
              }}
            >
              🚪
            </Typography>
          </>
        )}
      </Box>
    </IconButton>
  );
};
