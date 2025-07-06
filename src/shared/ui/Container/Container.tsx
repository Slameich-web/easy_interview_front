import { Container as MUIContainer, ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(MUIContainer)({
  position: 'relative',
  zIndex: 2,
});

const Container = (props: ContainerProps) => {
  return <StyledContainer {...props} />;
};

export default Container;