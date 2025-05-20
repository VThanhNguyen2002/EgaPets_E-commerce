import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import FacePoseCapture from "@/components/FacePoseCapture";
import { verifyFaceMulti } from "@/services/auth";
import { dataURLtoBase64 } from "@/utils/image";
import { useAuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { usePageTitle } from "@/hooks/usePageTitle";
import styles from "./LoginEmployee.module.css";
export default function LoginEmployee() {
    usePageTitle("Đăng nhập nhân viên – EGA Pets");
    const nav = useNavigate();
    const login = useAuthStore(s => s.login);
    const [uid, setUid] = useState("");
    const [caps, setCaps] = useState([]);
    const [error, setErr] = useState("");
    const doneCapture = (c) => { setCaps(c); toast.success("Đã chụp đủ 3 pose"); };
    async function submit(e) {
        e.preventDefault();
        setErr("");
        if (!uid || caps.length < 3)
            return setErr("Điền mã nhân viên và chụp đủ 3 pose!");
        try {
            const payload = {
                userId: Number(uid),
                images: caps.map(c => ({ pose: c.pose, base64: dataURLtoBase64(c.base64) }))
            };
            const { data } = await verifyFaceMulti(payload);
            login(data.token, data.username, data.role);
            toast.success("Đăng nhập thành công!");
            setTimeout(() => nav("/"), 1200);
        }
        catch (err) {
            setErr(err.response?.data?.error || "Xác thực thất bại!");
        }
    }
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("div", { className: styles.pageContent, children: [_jsx(Breadcrumbs, {}), _jsxs("div", { className: styles.wrapper, children: [_jsx("h2", { children: "\u0110\u0103ng nh\u1EADp nh\u00E2n vi\u00EAn" }), _jsxs("form", { className: styles.form, onSubmit: submit, children: [_jsx("label", { children: "M\u00E3 / Email *" }), _jsx("input", { value: uid, onChange: e => setUid(e.target.value) }), _jsx("label", { children: "Ch\u1EE5p khu\u00F4n m\u1EB7t *" }), _jsx(FacePoseCapture, { onComplete: doneCapture }), error && _jsx("div", { className: styles.error, children: error }), _jsx("button", { className: styles.btn, disabled: caps.length < 3, children: "\u0110\u0103ng nh\u1EADp" })] })] })] }), _jsx(Footer, {})] }));
}
