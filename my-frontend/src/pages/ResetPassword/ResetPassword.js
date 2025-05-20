import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { resetPassword } from '@/services/auth';
import { usePageTitle } from '@/hooks/usePageTitle';
import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';
import styles from './ResetPassword.module.css';
const ResetPassword = () => {
    usePageTitle('Đặt lại mật khẩu – EGA Pets');
    const { token } = useParams();
    const nav = useNavigate();
    const [pw, setPw] = useState('');
    const [msg, setMsg] = useState('');
    const [err, setErr] = useState('');
    const submit = async (e) => {
        e.preventDefault();
        setErr('');
        setMsg('');
        if (!pw.trim())
            return setErr('Nhập mật khẩu mới!');
        try {
            const { data } = await resetPassword(token, pw);
            setMsg(data.message);
            setTimeout(() => nav('/login'), 1800);
        }
        catch (e) {
            setErr(e.response?.data?.error || 'Đổi mật khẩu thất bại');
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("div", { className: styles.wrapper, children: [_jsx("h2", { children: "\u0110\u1EB7t l\u1EA1i m\u1EADt kh\u1EA9u" }), _jsxs("form", { onSubmit: submit, className: styles.form, children: [_jsx("input", { type: "password", placeholder: "M\u1EADt kh\u1EA9u m\u1EDBi", value: pw, onChange: e => setPw(e.target.value) }), _jsx("button", { className: styles.btn, children: "\u0110\u1ED5i m\u1EADt kh\u1EA9u" })] }), msg && _jsx("div", { className: styles.msg, children: msg }), err && _jsx("div", { className: styles.err, children: err })] }), _jsx(Footer, {})] }));
};
export default ResetPassword;
