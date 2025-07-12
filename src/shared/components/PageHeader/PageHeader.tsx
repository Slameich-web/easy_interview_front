import { useNavigate } from "react-router-dom";
import { AppBar } from "../../ui/AppBar";
import { Toolbar } from "../../ui/Toolbar";
import { IconButton } from "../../ui/IconButton";
import { LogoutButton } from "../../../features/auth";
import { UserChips } from "../../ui/UserChips";
import { useAuth } from "../../hooks/useAuth";
import {
  HeaderContainer,
  HeaderDivider,
  HeaderTitle,
  BackButton,
  BackButtonText,
  UserActionsContainer,
  UserChipsContainer,
} from "../../ui/StyledComponents";

interface PageHeaderProps {
  title: string;
  icon?: string;
  backTo?: string;
  showBackButton?: boolean;
}

export const PageHeader = ({
  title,
  icon,
  backTo = "/",
  showBackButton = true,
}: PageHeaderProps) => {
  const navigate = useNavigate();
  const { email, userData } = useAuth();

  const handleBackClick = () => {
    navigate(backTo);
  };

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar sx={{ justifyContent: "space-between", py: 1.5 }}>
        <HeaderContainer>
          {showBackButton && (
            <>
              <IconButton onClick={handleBackClick} sx={BackButton}>
                <BackButtonText>← Назад</BackButtonText>
              </IconButton>
              <HeaderDivider />
            </>
          )}
          
          <HeaderTitle variant="h5">
            {icon && <span>{icon}</span>}
            {title}
          </HeaderTitle>
        </HeaderContainer>

        <UserActionsContainer>
          <UserChipsContainer>
            <UserChips email={email!} userData={userData} />
          </UserChipsContainer>
          <LogoutButton />
        </UserActionsContainer>
      </Toolbar>
    </AppBar>
  );
};