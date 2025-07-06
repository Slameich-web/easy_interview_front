import { CircularProgress, Box, BoxProps } from "@mui/material";

interface LoadingSpinnerProps extends BoxProps {
  size?: number;
  color?: string;
}

const LoadingSpinner = ({
  size = 40,
  color = "inherit",
  ...props
}: LoadingSpinnerProps) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" {...props}>
      <CircularProgress
        size={size}
        sx={{
          color: color,
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
    </Box>
  );
};

export default LoadingSpinner;
