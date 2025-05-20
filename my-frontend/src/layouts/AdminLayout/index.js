import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/layouts/AdminLayout.tsx
import { Navigate, Outlet, Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
export default function AdminLayout() {
    const { isLoggedIn, role, logout } = useAuthStore();
    if (!isLoggedIn || role !== "Admin")
        return _jsx(Navigate, { to: "/admin/login", replace: true });
    return (_jsxs(Box, { sx: { display: "flex" }, children: [_jsx(AppBar, { position: "fixed", children: _jsxs(Toolbar, { sx: { gap: 3 }, children: [_jsx(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1 }, children: "Admin Dashboard" }), _jsx(Button, { component: Link, to: "/admin/products", color: "inherit", children: "S\u1EA3n ph\u1EA9m" }), _jsx(Button, { onClick: logout, color: "inherit", children: "\u0110\u0103ng xu\u1EA5t" })] }) }), _jsx(Box, { component: "main", sx: { flexGrow: 1, p: 3, mt: 8 }, children: _jsx(Outlet, {}) })] }));
}
