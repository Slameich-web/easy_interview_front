import { Button as MUIButton, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const PrimaryButton = styled(MUIButton)({
  padding: "16px 32px",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
  color: "white",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  boxShadow: "0 8px 25px rgba(255, 107, 107, 0.4)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "linear-gradient(135deg, #ee5a24 0%, #ff6b6b 100%)",
    transform: "translateY(-3px)",
    boxShadow: "0 12px 35px rgba(255, 107, 107, 0.5)",
  },
  "&:disabled": {
    background: "linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)",
    transform: "none",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
});

const SecondaryButton = styled(MUIButton)({
  padding: "16px 32px",
  borderRadius: "16px",
  background: "rgba(255, 255, 255, 0.2)",
  color: "white",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  backdropFilter: "blur(10px)",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    transform: "translateY(-2px)",
  },
});
type NewButtonProps = Omit<ButtonProps, "variant">;
interface CustomButtonProps extends NewButtonProps {
  variant?: "primary" | "secondary" | "text" | "outlined" | "contained";
}

const Button = ({ variant = "contained", ...props }: CustomButtonProps) => {
  if (variant === "primary") {
    return <PrimaryButton {...props} />;
  }
  if (variant === "secondary") {
    return <SecondaryButton {...props} />;
  }
  return <MUIButton variant={variant} {...props} />;
};

export default Button;
