import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { forgotPassword } from '@services/auth';
import { usePageTitle } from '@hooks/usePageTitle';
import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import styles from './ForgotPassword.module.css';
const ForgotPassword = () => {
    usePageTitle('Quên mật khẩu – EGA Pets');
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        setErr('');
        setMsg('');
        if (!email)
            return setErr('Nhập email trước khi gửi!');
        try {
            const { data } = await forgotPassword(email);
            setMsg(data.message);
        }
        catch (e) {
            setErr(e.response?.data?.error || 'Không gửi được email');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("div", { className: styles.pageContent, children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: styles.wrapper, children: [_jsx("h2", { children: "Kh\u00F4i ph\u1EE5c m\u1EADt kh\u1EA9u" }), _jsxs("form", { onSubmit: submit, className: styles.form, children: [_jsx("input", { type: "email", placeholder: "Email...", value: email, onChange: e => setEmail(e.target.value) }), _jsx("button", { className: styles.btn, children: "G\u1EEDi li\u00EAn k\u1EBFt" })] }), msg && _jsx("div", { className: styles.msg, children: msg }), err && _jsx("div", { className: styles.err, children: err })] })] }), _jsx(Footer, {})] }));
};
export default ForgotPassword;
