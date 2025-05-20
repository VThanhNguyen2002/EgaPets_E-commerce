import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import styles from "../LoginCustomer/LoginCustomer.module.css";
export default function AdminLogin() {
    const nav = useNavigate();
    const doLogin = useAuthStore(s => s.login);
    const [form, setForm] = useState({ username: "", password: "" });
    const [err, setErr] = useState("");
    const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    async function submit(e) {
        e.preventDefault();
        setErr("");
        try {
            const { data } = await login(form); // BE trả { token, username, role }
            if (data.role !== "Admin")
                return setErr("Không phải tài khoản Admin!");
            doLogin(data.token, data.username, data.role); // ➌ truyền đủ 3 đối số
            nav("/admin/products", { replace: true }); // ➍ đi thẳng vào dashboard
        }
        catch (err) {
            setErr(err.response?.data?.error || "Đăng nhập lỗi!");
        }
    }
    return (_jsx("div", { className: styles.pageContent, children: _jsxs("div", { className: styles.wrapper, children: [_jsx("h2", { children: "\u0110\u0103ng nh\u1EADp Admin" }), _jsxs("form", { className: styles.form, onSubmit: submit, children: [_jsx("label", { children: "T\u00EAn \u0111\u0103ng nh\u1EADp *" }), _jsx("input", { name: "username", onChange: change }), _jsx("label", { children: "M\u1EADt kh\u1EA9u *" }), _jsx("input", { name: "password", type: "password", onChange: change }), err && _jsx("div", { className: styles.error, children: err }), _jsx("button", { className: styles.btn, children: "\u0110\u0103ng nh\u1EADp" })] })] }) }));
}
