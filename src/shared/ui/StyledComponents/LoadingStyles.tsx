import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoadingContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
});

export const LoadingText = styled(Typography)({
  color: "rgba(255, 255, 255, 0.8)",
  textAlign: "center",
  fontWeight: 500,
});

export const NotFoundContainer = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 3,
});

export const NotFoundTitle = styled(Typography)({
  color: "#ffffff",
  textAlign: "center",
  fontWeight: 600,
});