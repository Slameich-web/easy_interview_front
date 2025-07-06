import { IconButton as MUIIconButton, IconButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledIconButton = styled(MUIIconButton)({
  color: "#ffffff",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "16px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    transform: "translateY(-2px)",
  },
});

const IconButton = (props: IconButtonProps) => {
  return <StyledIconButton {...props} />;
};

export default IconButton;
