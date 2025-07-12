import { LoadingSpinner } from "../../ui/LoadingSpinner";
import {
  LoadingContainer,
  LoadingText,
} from "../../ui/StyledComponents";

interface LoadingStateProps {
  message?: string;
  size?: number;
}

export const LoadingState = ({ 
  message = "Загрузка...", 
  size = 60 
}: LoadingStateProps) => {
  return (
    <LoadingContainer>
      <LoadingSpinner size={size} />
      <LoadingText variant="h6">
        {message}
      </LoadingText>
    </LoadingContainer>
  );
};