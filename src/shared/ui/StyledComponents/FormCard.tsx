import { styled } from "@mui/material/styles";
import { Card } from "../Card";

export const FormCard = styled(Card)({
  width: "100%",
  maxWidth: "450px",
  padding: "48px 40px",
  background:
    "linear-gradient(145deg, #667eea 0%,rgb(67, 20, 114) 50%,rgb(117, 137, 250) 100%)",
  boxShadow: `
    0 25px 50px rgba(102, 126, 234, 0.25),
    0 10px 30px rgba(118, 75, 162, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
  border: "1px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(20px)",
  animation: "slideInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  "&::before": {
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.1) 100%)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    animation: "shimmer 3s ease-in-out infinite",
    zIndex: -1,
  },
  "@keyframes slideInUp": {
    from: {
      opacity: 0,
      transform: "translateY(30px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
  "@keyframes shimmer": {
    "0%, 100%": {
      transform: "rotate(0deg) scale(1)",
      opacity: 0.3,
    },
    "50%": {
      transform: "rotate(180deg) scale(1.1)",
      opacity: 0.1,
    },
  },
});