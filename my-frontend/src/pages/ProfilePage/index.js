import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/ProfilePage/index.tsx
import { useState, useEffect } from "react";
import useProfile from "@/hooks/useProfile";
import styles from "./ProfilePage.module.css";
export default function ProfilePage() {
    const { data, isLoading, save } = useProfile();
    const [form, setForm] = useState({});
    /* fill once */
    useEffect(() => { if (data)
        setForm(data); }, [data]);
    if (isLoading)
        return _jsx("p", { children: "\u0110ang t\u1EA3i\u2026" });
    return (_jsxs("div", { className: styles.wrap, children: [_jsx("h1", { children: "Th\u00F4ng tin t\u00E0i kho\u1EA3n" }), _jsxs("form", { onSubmit: e => { e.preventDefault(); save.mutate(form); }, children: [_jsxs("label", { children: ["H\u1ECD t\u00EAn", _jsx("input", { value: form.ho_ten || "", onChange: e => setForm({ ...form, ho_ten: e.target.value }) })] }), _jsxs("label", { children: ["S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", _jsx("input", { value: form.so_dien_thoai || "", onChange: e => setForm({ ...form, so_dien_thoai: e.target.value }) })] }), _jsxs("label", { children: ["\u0110\u1ECBa ch\u1EC9", _jsx("input", { value: form.dia_chi || "", onChange: e => setForm({ ...form, dia_chi: e.target.value }) })] }), _jsx("button", { children: "L\u01B0u thay \u0111\u1ED5i" })] })] }));
}
