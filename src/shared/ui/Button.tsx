import { ButtonProps, Button as MUIButton } from "@mui/material";

const Button = (props: ButtonProps) => {
  return <MUIButton {...props}></MUIButton>;
};

export default Button;
