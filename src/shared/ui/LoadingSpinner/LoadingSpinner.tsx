import { CircularProgress, Box, BoxProps } from "@mui/material";

interface LoadingSpinnerProps extends BoxProps {
  size?: number;
}

const LoadingSpinner = ({ size = 40, ...props }: LoadingSpinnerProps) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      {...props}
    >
      <CircularProgress size={size} />
    </Box>
  );
};

export default LoadingSpinner;