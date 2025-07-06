import { Chip as MUIChip, ChipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledChip = styled(MUIChip)({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  color: '#ffffff',
  fontWeight: 500,
  '& .MuiChip-label': {
    fontSize: '14px',
  },
});

const Chip = (props: ChipProps) => {
  return <StyledChip {...props} />;
};

export default Chip;