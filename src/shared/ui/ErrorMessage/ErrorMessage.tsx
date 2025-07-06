import { Alert, AlertProps } from "@mui/material";

interface ErrorMessageProps extends Omit<AlertProps, "severity"> {
  message: string;
}

const ErrorMessage = ({ message, ...props }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <Alert severity="error" {...props}>
      {message}
    </Alert>
  );
};

export default ErrorMessage;
