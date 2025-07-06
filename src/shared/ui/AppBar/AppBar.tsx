import { AppBar as MUIAppBar, AppBarProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(MUIAppBar)({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  position: "relative",
});

const AppBar = (props: AppBarProps) => {
  return <StyledAppBar {...props} />;
};

export default AppBar;
