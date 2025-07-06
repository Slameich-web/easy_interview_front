import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectAuth } from "../../features/auth";

const PublicRoute = () => {
  const auth = useSelector(selectAuth);
  if (auth.id) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
