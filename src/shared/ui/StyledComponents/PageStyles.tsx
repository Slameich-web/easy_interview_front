import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const PageHeroContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: "32px",
  [theme.breakpoints.up("md")]: {
    marginBottom: "48px",
  },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  color: "#ffffff",
  marginBottom: "16px",
  textShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  fontSize: "2rem",
  lineHeight: 1.2,
  [theme.breakpoints.up("sm")]: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "3rem",
  },
}));

export const PageSubtitle = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.9)",
  marginBottom: "24px",
  maxWidth: "700px",
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
  fontSize: "1rem",
  fontWeight: 400,
  [theme.breakpoints.up("md")]: {
    fontSize: "1.25rem",
  },
}));

export const StatsContainer = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 2,
  flexWrap: "wrap",
  justifyContent: "center",
});

export const StatsBadge = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 1,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "8px 24px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
});

export const StatsText = styled(Typography)({
  color: "rgba(255, 255, 255, 0.8)",
  fontWeight: 600,
  fontSize: "0.875rem",
});

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: "48px 0",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  borderRadius: "24px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  [theme.breakpoints.up("md")]: {
    padding: "80px 0",
  },
}));

export const EmptyStateTitle = styled(Typography)(({ theme }) => ({
  color: "rgba(255, 255, 255, 0.7)",
  marginBottom: "16px",
  fontSize: "1.5rem",
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
}));

export const EmptyStateText = styled(Typography)({
  color: "rgba(255, 255, 255, 0.6)",
  maxWidth: "400px",
  marginLeft: "auto",
  marginRight: "auto",
  lineHeight: 1.6,
});