import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Wallet, Banknote, CreditCard, CheckCircle } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import useProvinces from "@/hooks/useProvinces";
import usePaymentMethods from "@/hooks/usePaymentMethods";
import useCheckout from "@/hooks/useCheckout";
import { formatCurrency } from "@/utils/formatCurrency";
import PromoInput from "@/components/PromoInput";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import styles from "./CheckoutPage.module.css";
export default function CheckoutPage() {
    const { state } = useLocation();
    const { cartItems, clearLocal } = useCartStore();
    const khachHangId = useAuthStore(s => s.username);
    /* ───────────────── UI state ───────────────── */
    const [form, setForm] = useState({
        name: "", email: "", phone: "", address: "",
        province: "", district: "", pay: "", coupon: ""
    });
    const [provinceCode, setProvinceCode] = useState();
    const [districts, setDistricts] = useState([]);
    const [promoApplied, setPromoApplied] = useState(false);
    /* ─────────────── data hooks ─────────────── */
    const { provinces } = useProvinces();
    const { data: methods } = usePaymentMethods();
    const { step, qr, msg, submit, markPaid } = useCheckout();
    /* ─────────────── price calc ─────────────── */
    const subTotal = cartItems.reduce((n, i) => n + i.gia, 0);
    const grandTotal = state?.total ?? subTotal;
    const discount = promoApplied ? grandTotal * 0.5 : 0;
    const totalPay = grandTotal - discount;
    /* ─────────────── handlers ─────────────── */
    async function handleSubmit(e) {
        e.preventDefault();
        if (step !== "form")
            return;
        await submit({
            customerId: khachHangId ? +khachHangId : null,
            guestInfo: { hoTen: form.name, phone: form.phone, email: form.email },
            items: cartItems.map(i => ({
                id: i.san_pham_id, qty: i.so_luong,
                price: i.don_gia, discount: i.giam_gia ?? 0
            })),
            discount: promoApplied ? 50 : 0,
            payMethod: Number(form.pay),
            payMethodLabel: methods.find(m => String(m.id) === form.pay).ten_phuong_thuc
        });
        clearLocal(); // dọn giỏ sau khi submit
    }
    function handleProvince(e) {
        const code = +e.target.value;
        setProvinceCode(code);
        const p = provinces.find(p => p.code === code);
        setDistricts(p ? p.districts : []);
        setForm({ ...form, province: p?.name || "", district: "" });
    }
    /* ─────────────── hỗ trợ render ─────────────── */
    const icon = (lbl) => lbl.toLowerCase().includes("momo")
        ? _jsx(Wallet, { size: 26, color: "#a50064" })
        : lbl.toLowerCase().includes("ngân")
            ? _jsx(Banknote, { size: 26, color: "#31b057" })
            : _jsx(CreditCard, { size: 26, color: "#ffa502" });
    /* ------------------------------------------------------------------ */
    return (_jsxs("div", { className: styles.wrapper, children: [_jsx("div", { className: styles.pageTitle, children: "EGA Pets" }), _jsx(Breadcrumbs, {}), step === "form" && (_jsxs("div", { className: styles.content, children: [_jsxs("form", { className: styles.form, onSubmit: handleSubmit, children: [_jsx("h2", { className: styles.heading, children: "Th\u00F4ng tin giao h\u00E0ng" }), _jsxs("div", { className: styles.customerFields, children: [_jsx("input", { placeholder: "H\u1ECD v\u00E0 t\u00EAn", value: form.name, onChange: e => setForm({ ...form, name: e.target.value }), required: true }), _jsx("input", { placeholder: "Email", type: "email", value: form.email, onChange: e => setForm({ ...form, email: e.target.value }), required: true }), _jsx("input", { placeholder: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i", value: form.phone, onChange: e => setForm({ ...form, phone: e.target.value }), required: true }), _jsx("input", { placeholder: "\u0110\u1ECBa ch\u1EC9", value: form.address, onChange: e => setForm({ ...form, address: e.target.value }), required: true }), _jsxs("div", { className: styles.selectRow, children: [_jsxs("select", { value: provinceCode ?? "", onChange: handleProvince, required: true, children: [_jsx("option", { value: "", children: "T\u1EC9nh / th\u00E0nh" }), provinces.map(p => _jsx("option", { value: p.code, children: p.name }, p.code))] }), _jsxs("select", { value: form.district, onChange: e => setForm({ ...form, district: e.target.value }), required: true, children: [_jsx("option", { value: "", children: "Qu\u1EADn / huy\u1EC7n" }), districts.map(d => _jsx("option", { value: d.name, children: d.name }, d.code))] })] })] }), _jsx("h3", { className: styles.subHeading, children: "Ph\u01B0\u01A1ng th\u1EE9c thanh to\u00E1n" }), _jsx("div", { className: styles.paymentMethod, children: methods.map(pm => {
                                    const idStr = String(pm.id);
                                    return (_jsxs("label", { className: `${styles.paymentOption} ${form.pay === idStr ? styles.active : ""}`, children: [_jsx("input", { type: "radio", name: "pay", value: idStr, checked: form.pay === idStr, onChange: () => setForm({ ...form, pay: idStr }) }), _jsx("div", { className: styles.paymentIcon, children: icon(pm.ten_phuong_thuc) }), _jsx("span", { className: styles.paymentLabel, children: pm.ten_phuong_thuc })] }, pm.id));
                                }) }), _jsx("button", { className: styles.orderBtn, children: "Ho\u00E0n t\u1EA5t \u0111\u01A1n h\u00E0ng" }), _jsx("p", { className: styles.backLink, children: _jsx(Link, { to: "/cart", children: "\u2190 Quay v\u1EC1 gi\u1ECF h\u00E0ng" }) })] }), _jsxs("aside", { className: styles.summary, children: [cartItems.map(it => (_jsxs("div", { className: styles.item, children: [_jsxs("div", { className: styles.left, children: [_jsx("img", { src: it.thumb || "/src/assets/img-placeholder.png", alt: it.ten_san_pham }), _jsxs("span", { className: styles.qty, children: ["\u00D7 ", it.so_luong] })] }), _jsx("div", { className: styles.info, children: _jsx("span", { className: styles.title, children: it.ten_san_pham }) }), _jsx("div", { className: styles.price, children: _jsx("b", { children: formatCurrency(it.gia) }) })] }, it.id))), _jsx(PromoInput, { enabled: cartItems.length > 0, cartCount: cartItems.length, subTotal: grandTotal, applied: promoApplied, onApply: () => setPromoApplied(true) }), _jsxs("div", { className: styles.totalRow, children: [_jsx("span", { children: "T\u1ED5ng c\u1ED9ng" }), _jsx("strong", { children: formatCurrency(totalPay) })] })] })] })), step === "waiting" && (_jsxs("div", { className: styles.waiting, children: [_jsx("h2", { children: "\u0110ang ch\u1EDD b\u1EA1n thanh to\u00E1n MoMo\u2026" }), qr && _jsx("img", { src: qr, className: styles.qr }), _jsx("button", { onClick: () => markPaid("Bạn đã xác nhận đã thanh toán"), className: styles.doneBtn, children: "T\u00F4i \u0111\u00E3 thanh to\u00E1n" })] })), step === "done" && (_jsxs("div", { className: styles.done, children: [_jsx(CheckCircle, { size: 72, color: "#31b057" }), _jsx("h2", { children: msg || "Đặt hàng thành công!" }), _jsx(Link, { to: "/", className: styles.homeLink, children: "\u2190 V\u1EC1 trang ch\u1EE7" })] }))] }));
}
