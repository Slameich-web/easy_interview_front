import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SubmitButton = styled(Button)({
  padding: "18px 32px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
  fontSize: "17px",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "1px",
  marginTop: "16px",
  height: "64px",
  color: "#ffffff",
  boxShadow:
    "0 8px 25px rgba(255, 107, 107, 0.4), 0 4px 15px rgba(238, 90, 36, 0.2)",
  "&:hover:not(:disabled)": {
    transform: "translateY(-3px)",
    boxShadow:
      "0 12px 35px rgba(255, 107, 107, 0.5), 0 6px 20px rgba(238, 90, 36, 0.3)",
    background: "linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%)",
  },
  "&:active": {
    transform: "translateY(-1px)",
  },
  "&:disabled": {
    background: "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)",
    transform: "none",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
});
