import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/PromoInput/index.tsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { formatCurrency } from "@/utils/formatCurrency";
import styles from "./PromoInput.module.css";
const PROMO = "EGA50";
const RATE = .5;
export default function PromoInput({ enabled, cartCount, subTotal, applied, onApply }) {
    const [code, setCode] = useState("");
    /* Khi parent huỷ áp dụng (cart < 2 SP) → clear input */
    useEffect(() => {
        if (!applied)
            setCode("");
    }, [applied]);
    const apply = () => {
        if (code.trim().toUpperCase() !== PROMO)
            return toast.error("Mã không hợp lệ!");
        if (cartCount < 2)
            return toast.info("Cần ≥ 2 sản phẩm để áp dụng EGA50");
        onApply();
        toast.success(`Đã giảm ${formatCurrency(subTotal * RATE)}`);
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.box, children: [_jsx("input", { placeholder: "M\u00E3 gi\u1EA3m gi\u00E1", value: code, disabled: !enabled || applied, onChange: e => setCode(e.target.value) }), _jsx("button", { onClick: apply, disabled: !enabled || applied, children: "\u00C1p d\u1EE5ng" })] }), applied && (_jsxs("p", { className: styles.msg, children: ["\u2714 Gi\u1EA3m ", formatCurrency(subTotal * RATE)] }))] }));
}
