import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const PublicRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
