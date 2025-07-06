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
    <IconButton
      onClick={handleLogout}
      disabled={isLoggingOut}
      sx={{
        px: 3,
        py: 1.5,
        minWidth: "120px",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0.5px",
        textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        {isLoggingOut ? (
          <>
            <LoadingSpinner size={16} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Выход...
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              🚪 Выйти
            </Typography>
          </>
        )}
      </Box>
    </IconButton>
  );
};
