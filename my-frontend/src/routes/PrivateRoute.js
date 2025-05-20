import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
export const PrivateRoute = ({ children }) => {
    const isLogged = useAuthStore(s => !!s.token);
    return isLogged ? children : _jsx(Navigate, { to: "/login" });
};
