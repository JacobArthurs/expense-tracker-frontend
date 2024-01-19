import { useAuth } from "../providers/AuthProvider";
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children
};