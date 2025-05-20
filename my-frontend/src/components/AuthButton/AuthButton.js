import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuthStore } from "@/store/authStore";
import styles from "./AuthButton.module.css";
import { toast } from "react-toastify";
export default function AuthButton() {
    const nav = useNavigate();
    const { username, isLoggedIn, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const onMainClick = () => {
        if (!isLoggedIn)
            nav("/login");
        else
            setOpen(p => !p);
    };
    return (_jsxs("div", { className: styles.wrap, children: [_jsxs("button", { className: styles.main, onClick: onMainClick, children: [_jsx(FaUser, { className: styles.ic }), _jsx("span", { className: styles.top, children: isLoggedIn ? "Xin chào" : "Tài khoản" }), _jsx("span", { className: styles.bot, children: username || "Đăng nhập" })] }), isLoggedIn && open && (_jsxs("div", { className: styles.dropdown, children: [_jsx("button", { onClick: () => nav("/profile"), children: "Th\u00F4ng tin t\u00E0i kho\u1EA3n" }), _jsx("button", { onClick: () => { logout(); toast.success("Đăng xuất thành công!", { theme: "colored" }); setOpen(false); }, children: "\u0110\u0103ng xu\u1EA5t" })] }))] }));
}
