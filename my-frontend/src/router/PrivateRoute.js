import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
export default function PrivateRoute({ children, requireRole, }) {
    const { isLoggedIn, role } = useAuthStore();
    if (!isLoggedIn)
        return _jsx(Navigate, { to: "/admin/login", replace: true });
    if (role !== requireRole)
        return _jsx(Navigate, { to: "/", replace: true });
    return _jsx(_Fragment, { children: children });
}
