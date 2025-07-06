import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { selectAuth } from "../../features/auth";

const ProtectedRoute = () => {
  const auth = useSelector(selectAuth);

  if (!auth.id) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
