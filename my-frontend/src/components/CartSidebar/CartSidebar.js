import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/components/CartSidebar/CartSidebar.tsx
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingCart, X, Minus, Plus, LogIn, Package } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import useProducts from "@/hooks/useProducts";
import ProductCardMini from "@/components/ProductCardMini/ProductCardMini";
import { formatCurrency } from "@/utils/formatCurrency";
import styles from "./CartSidebar.module.css";
const PROMO = "EGA50";
const RATE = 0.5;
export default function CartSidebar({ isOpen, onClose }) {
    const { cartItems, refresh, remove, updateQty, add, optimisticAdd } = useCartStore();
    const { isLoggedIn } = useAuthStore();
    const nav = useNavigate();
    const [code, setCode] = useState("");
    const [ok, setOk] = useState(false);
    const [closing, setClosing] = useState(false);
    useEffect(() => {
        if (isOpen) {
            refresh();
            setCode("");
            setOk(false);
            setClosing(false);
        }
    }, [isOpen]);
    const hasCat = cartItems.some(i => i.loai === "cat");
    const hasDog = cartItems.some(i => i.loai === "dog");
    const { products } = useProducts(hasCat ? "cat" : hasDog ? "dog" : "");
    const suggest = products.filter(p => !cartItems.find(c => c.san_pham_id === p.id)).slice(0, 8);
    const sub = cartItems.reduce((n, i) => n + i.gia, 0);
    const canApply = code.trim().toUpperCase() === PROMO && cartItems.length >= 2;
    const disc = ok ? sub * RATE : 0;
    const grand = sub - disc;
    const applyPromo = () => {
        if (code.trim().toUpperCase() !== PROMO)
            return toast.error("Mã không hợp lệ!");
        if (cartItems.length < 2)
            return toast.info("Cần ít nhất 2 sản phẩm để áp dụng EGA50");
        setOk(true);
        toast.success("Đã áp dụng mã giảm giá!");
    };
    const goCheckout = () => {
        if (!isLoggedIn) {
            toast.info("Hãy đăng nhập trước khi thanh toán");
            nav("/login");
            return;
        }
        nav("/checkout");
    };
    const handleClose = () => {
        setClosing(true);
        setTimeout(() => onClose(), 300);
    };
    if (typeof window === "undefined")
        return null;
    return ReactDOM.createPortal(_jsxs("div", { className: `${styles.overlay} ${isOpen ? styles.open : ""} ${closing ? styles.closing : ""}`, onClick: handleClose, children: [suggest.length > 0 && (_jsxs("aside", { className: styles.suggest, onClick: e => e.stopPropagation(), children: [_jsx("h3", { children: "S\u1EA3n ph\u1EA9m g\u1EE3i \u00FD" }), _jsx("div", { className: styles.grid, children: suggest.map(p => (_jsx(ProductCardMini, { p: p, onClick: () => nav(`/product/${p.id}`), onAdd: async () => {
                                optimisticAdd(p);
                                await add({ productId: p.id, quantity: 1 });
                                refresh();
                            } }, p.id))) })] })), _jsxs("aside", { className: styles.sidebar, onClick: e => e.stopPropagation(), children: [_jsxs("header", { className: styles.header, children: [_jsx(ShoppingCart, { size: 22 }), " Gi\u1ECF h\u00E0ng", _jsx("button", { onClick: handleClose, children: _jsx(X, { size: 22 }) })] }), cartItems.length === 0 ? (_jsxs("div", { className: styles.empty, children: [_jsx("img", { src: "/src/assets/empty-cart.jpg" }), _jsx("p", { children: "Gi\u1ECF h\u00E0ng tr\u1ED1ng" })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: styles.wrapper, children: [_jsx("ul", { className: styles.list, children: cartItems.map(it => (_jsxs("li", { className: styles.item, children: [_jsx("img", { src: it.thumb || "/src/assets/img-placeholder.png" }), _jsxs("div", { className: styles.info, children: [_jsx("span", { className: styles.name, children: it.ten_san_pham }), it.ma_sp && _jsxs("i", { className: styles.sku, children: ["#", it.ma_sp] }), _jsx("span", { className: styles.unit, children: formatCurrency(it.don_gia) })] }), _jsxs("div", { className: styles.qtyBox, children: [_jsx("button", { disabled: it.so_luong <= 1, onClick: () => updateQty(it.id, it.so_luong - 1), children: _jsx(Minus, { size: 14 }) }), _jsx("span", { children: it.so_luong }), _jsx("button", { onClick: () => updateQty(it.id, it.so_luong + 1), children: _jsx(Plus, { size: 14 }) })] }), _jsx("span", { className: styles.line, children: formatCurrency(it.gia) }), _jsx("button", { className: styles.del, onClick: () => remove(it.id), children: _jsx(X, { size: 16 }) })] }, it.id))) }), _jsxs("div", { className: styles.promoBox, children: [_jsx("input", { placeholder: "M\u00E3 gi\u1EA3m gi\u00E1", value: code, disabled: ok, onChange: e => {
                                                    setOk(false);
                                                    setCode(e.target.value);
                                                } }), _jsx("button", { onClick: applyPromo, children: "\u00C1p d\u1EE5ng" })] }), ok && _jsxs("p", { className: styles.promoMsg, children: ["\u2714 Gi\u1EA3m ", formatCurrency(disc)] })] }), _jsxs("div", { className: styles.footer, children: [_jsxs("div", { className: styles.total, children: [_jsx("span", { children: "T\u1ED5ng c\u1ED9ng" }), _jsx("b", { children: formatCurrency(grand) })] }), _jsxs("button", { className: styles.pay, onClick: goCheckout, children: [isLoggedIn ? _jsx(Package, { size: 18 }) : _jsx(LogIn, { size: 18 }), isLoggedIn ? "THANH TOÁN" : "ĐĂNG NHẬP ĐỂ THANH TOÁN"] }), _jsx("button", { className: styles.view, onClick: () => { handleClose(); nav("/cart"); }, children: "Xem gi\u1ECF h\u00E0ng" })] })] }))] })] }), document.body);
}
