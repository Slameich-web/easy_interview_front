import { useSelector } from "react-redux";
import { selectAuth, selectIsAuth, selectUserData } from "../../features/auth";

export function useAuth() {
  const auth = useSelector(selectAuth);
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector(selectUserData);

  return {
    isAuth,
    email: auth.email,
    token: auth.token,
    id: auth.id,
    userData,
    isLoading: auth.isLoading,
    error: auth.error,
  };
}
