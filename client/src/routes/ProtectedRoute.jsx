// src/routes/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/ui/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // While checking authentication
  if (loading) {
    return <Loader />;
  }

  // If not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated
  return children;
};

export default ProtectedRoute;