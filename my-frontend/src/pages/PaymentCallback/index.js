import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/PaymentCallback/index.tsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import useCheckout from "@/hooks/useCheckout";
import cls from "./PaymentCallback.module.css";
export default function PaymentCallback() {
    const [sp] = useSearchParams();
    const { markPaid } = useCheckout(); // (waiting → done)
    const [status, setStatus] = useState("fail");
    /* chạy đúng 1 lần khi component mount */
    useEffect(() => {
        const result = sp.get("resultCode"); // "0" = OK theo MoMo
        if (result === "0") {
            markPaid("Đơn hàng của bạn đã được thanh toán thành công!");
            setStatus("success");
        }
        else {
            setStatus("fail");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const Icon = status === "success" ? CheckCircle : XCircle;
    const msg = status === "success"
        ? "Thanh toán thành công! Cảm ơn bạn ♥"
        : "Thanh toán thất bại. Vui lòng thử lại.";
    return (_jsxs("div", { className: cls.wrapper, children: [_jsx(Icon, { size: 80, className: `${cls.icon} ${cls[status]}` }), _jsx("p", { children: msg }), _jsx(Link, { to: "/", className: cls.back, children: "\u2190 V\u1EC1 trang ch\u1EE7" })] }));
}
