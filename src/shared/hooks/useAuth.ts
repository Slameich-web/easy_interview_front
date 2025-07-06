import { useSelector } from "react-redux";
import { selectAuth, selectIsAuth } from "../../features/auth";

export function useAuth() {
  const auth = useSelector(selectAuth);
  const isAuth = useSelector(selectIsAuth);

  return {
    isAuth,
    email: auth.email,
    token: auth.token,
    id: auth.id,
    isLoading: auth.isLoading,
    error: auth.error,
  };
}
