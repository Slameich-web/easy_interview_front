import {
  EmptyStateContainer,
  EmptyStateTitle,
  EmptyStateText,
} from "../../ui/StyledComponents";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
}

export const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <EmptyStateContainer>
      <EmptyStateTitle variant="h4">
        {icon} {title}
      </EmptyStateTitle>
      <EmptyStateText variant="body1">
        {description}
      </EmptyStateText>
    </EmptyStateContainer>
  );
};