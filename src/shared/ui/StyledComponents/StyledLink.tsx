import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

export const StyledLink = styled(Link)({
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: 600,
  padding: "16px 32px",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "25px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  letterSpacing: "0.5px",
  display: "inline-block",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)",
  },
});