import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectAuth } from "../../features/auth";

const ProtectedRoute = () => {
  const user = useSelector(selectAuth);

  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
