// src/router/PrivateRoute.tsx
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export default function PrivateRoute({
  children,
  requireRole,
}: { children: ReactNode; requireRole: string }) {
  const { isLoggedIn, role } = useAuthStore();

  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;
  if (role !== requireRole) return <Navigate to="/" replace />;

  return <>{children}</>;
}

