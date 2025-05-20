import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { login } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { usePageTitle } from "@/hooks/usePageTitle";
import styles from "./LoginCustomer.module.css";
export default function LoginCustomer() {
    usePageTitle("Tài khoản – EGA Pets");
    const nav = useNavigate();
    const doLogin = useAuthStore(s => s.login);
    const isLoggedIn = useAuthStore(s => s.isLoggedIn);
    useEffect(() => {
        if (isLoggedIn)
            nav("/"); // đã login → đá khỏi /login
    }, [isLoggedIn]);
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setErr] = useState("");
    const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    async function submit(e) {
        e.preventDefault();
        setErr("");
        if (!form.username || !form.password)
            return setErr("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!");
        try {
            const { data } = await login(form);
            if (data.role !== "KhachHang")
                return setErr("Tài khoản này không phải khách hàng!");
            doLogin(data.token, data.username, data.khachHangId);
            toast.success("Đăng nhập thành công!");
            setTimeout(() => nav("/"), 1200);
        }
        catch (err) {
            setErr(err.response?.data?.error || "Đăng nhập thất bại!");
        }
    }
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("div", { className: styles.pageContent, children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: styles.wrapper, children: [_jsx("h2", { children: "\u0110\u0103ng nh\u1EADp t\u00E0i kho\u1EA3n" }), _jsxs("p", { children: ["Ch\u01B0a c\u00F3 t\u00E0i kho\u1EA3n? ", _jsx("a", { href: "/register", children: "\u0110\u0103ng k\u00FD t\u1EA1i \u0111\u00E2y" })] }), _jsxs("form", { className: styles.form, onSubmit: submit, children: [_jsx("label", { children: "T\u00EAn \u0111\u0103ng nh\u1EADp *" }), _jsx("input", { name: "username", onChange: change }), _jsx("label", { children: "M\u1EADt kh\u1EA9u *" }), _jsx("input", { name: "password", type: "password", onChange: change }), error && _jsx("div", { className: styles.error, children: error }), _jsx("button", { className: styles.btn, children: "\u0110\u0103ng nh\u1EADp" })] }), _jsxs("div", { className: styles.forgot, children: ["Qu\u00EAn m\u1EADt kh\u1EA9u? ", _jsx("a", { href: "/forgot-password", children: "Nh\u1EA5n v\u00E0o \u0111\u00E2y" })] })] })] }), _jsx(Footer, {})] }));
}
