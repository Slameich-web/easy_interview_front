import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const HeaderContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 2,
});

export const HeaderDivider = styled(Box)(({ theme }) => ({
  width: "2px",
  height: "24px",
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  borderRadius: "1px",
  display: "none",
  marginLeft: "4px",
  [theme.breakpoints.up("sm")]: {
    display: "block",
  },
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#ffffff",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  letterSpacing: "0.5px",
  display: "flex",
  alignItems: "center",
  gap: 1,
  fontSize: "1rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
}));

export const BackButtonText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  gap: 0.5,
  fontSize: "0.8rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "0.875rem",
  },
}));

export const UserActionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  [theme.breakpoints.up("sm")]: {
    gap: 2,
  },
}));

export const UserChipsContainer = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));
