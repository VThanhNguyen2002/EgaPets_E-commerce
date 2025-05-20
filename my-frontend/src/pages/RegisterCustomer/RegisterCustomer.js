import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { registerCustomer } from '@/services/auth';
import { usePageTitle } from '@/hooks/usePageTitle';
import styles from './RegisterCustomer.module.css';
const RegisterCustomer = () => {
    usePageTitle('Đăng ký tài khoản – EGA Pets');
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');
        const { username, password, email } = form;
        if (!username || !password || !email) {
            setError('Vui lòng nhập đầy đủ thông tin!');
            return;
        }
        try {
            const { data } = await registerCustomer(form);
            setMsg(data.message);
            setTimeout(() => navigate('/login'), 1800);
        }
        catch (err) {
            setError(err.response?.data?.error || 'Đăng ký thất bại!');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("div", { className: styles.pageContent, children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: styles.wrapper, children: [_jsx("h2", { children: "\u0110\u0103ng k\u00FD t\u00E0i kho\u1EA3n" }), _jsxs("form", { className: styles.form, onSubmit: handleSubmit, children: [_jsx("label", { children: "T\u00EAn \u0111\u0103ng nh\u1EADp *" }), _jsx("input", { type: "text", name: "username", placeholder: "T\u00EAn \u0111\u0103ng nh\u1EADp", onChange: handleChange }), _jsx("label", { children: "Email *" }), _jsx("input", { type: "email", name: "email", placeholder: "Email", onChange: handleChange }), _jsx("label", { children: "M\u1EADt kh\u1EA9u *" }), _jsx("input", { type: "password", name: "password", placeholder: "M\u1EADt kh\u1EA9u", onChange: handleChange }), msg && _jsx("div", { className: styles.msg, children: msg }), error && _jsx("div", { className: styles.error, children: error }), _jsx("button", { className: styles.btn, children: "\u0110\u0103ng k\u00FD" })] }), _jsxs("div", { className: styles.forgot, children: ["\u0110\u00E3 c\u00F3 t\u00E0i kho\u1EA3n? ", _jsx("a", { href: "/login", children: "\u0110\u0103ng nh\u1EADp" })] })] })] }), _jsx(Footer, {})] }));
};
export default RegisterCustomer;
