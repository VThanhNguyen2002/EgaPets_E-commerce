import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useAuthStore((state: { user: string | null }) => state.user);
  return user ? children : <Navigate to="/login" />;
};
