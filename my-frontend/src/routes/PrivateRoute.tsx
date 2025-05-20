import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const isLogged = useAuthStore(s => !!s.token);
  return isLogged ? children : <Navigate to="/login" />;
};
