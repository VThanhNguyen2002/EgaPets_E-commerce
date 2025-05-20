import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, LogIn, Package } from "lucide-react";
import { toast } from "react-toastify";
import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PromoInput from "@/components/PromoInput";
import ProductCardMini from "@/components/ProductCardMini/ProductCardMini";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import useProducts from "@/hooks/useProducts";
import { usePageTitle } from "@/hooks/usePageTitle";
import { formatCurrency } from "@/utils/formatCurrency";
import styles from "./CartPage.module.css";
const PROMO = "EGA50";
const RATE = 0.5;
export default function CartPage() {
    const nav = useNavigate();
    const { setLoading } = useLoadingStore();
    const { cartItems, remove, updateQty, add, optimisticAdd, refresh, } = useCartStore();
    const { isLoggedIn } = useAuthStore();
    usePageTitle("Giỏ hàng của bạn - EGA Pets");
    useEffect(() => {
        (async () => {
            await refresh();
            setLoading(false);
        })();
    }, []);
    const hasCat = cartItems.some((i) => i.loai === "cat");
    const hasDog = cartItems.some((i) => i.loai === "dog");
    const { products } = useProducts(hasCat ? "cat" : hasDog ? "dog" : "");
    const suggest = useMemo(() => products
        .filter((p) => !cartItems.find((c) => c.san_pham_id === p.id))
        .slice(0, 8), [products, cartItems]);
    const subTotal = cartItems.reduce((s, i) => s + i.gia, 0);
    const [promoApplied, setPromoApplied] = useState(false);
    const discount = promoApplied ? subTotal * RATE : 0;
    const grandTotal = subTotal - discount;
    useEffect(() => {
        if (cartItems.length < 2 && promoApplied)
            setPromoApplied(false);
    }, [cartItems, promoApplied]);
    const goCheckout = () => {
        if (!isLoggedIn) {
            toast.info("Hãy đăng nhập trước khi thanh toán");
            nav("/login");
        }
        else {
            nav("/checkout", { state: { total: grandTotal } });
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("main", { className: styles.page, children: [_jsx("div", { className: styles.breadcrumbsWrapper, children: _jsx(Breadcrumbs, {}) }), _jsx("h1", { className: styles.title, children: "Gi\u1ECF h\u00E0ng" }), cartItems.length === 0 ? (_jsx("p", { className: styles.empty, children: "Gi\u1ECF h\u00E0ng c\u1EE7a b\u1EA1n \u0111ang tr\u1ED1ng!" })) : (_jsxs("section", { className: styles.grid, children: [_jsxs("table", { className: styles.table, children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { colSpan: 2, children: "S\u1EA3n ph\u1EA9m" }), _jsx("th", { children: "\u0110\u01A1n gi\u00E1" }), _jsx("th", { children: "S\u1ED1 l\u01B0\u1EE3ng" }), _jsx("th", { children: "T\u1EA1m t\u00EDnh" }), _jsx("th", {})] }) }), _jsx("tbody", { children: cartItems.map((it) => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("img", { src: it.thumb || "/src/assets/img-placeholder.png" }) }), _jsxs("td", { className: styles.pName, children: [it.ten_san_pham, it.ma_sp && _jsxs("small", { children: ["#", it.ma_sp] })] }), _jsx("td", { children: formatCurrency(it.don_gia) }), _jsx("td", { children: _jsxs("div", { className: styles.qtyBoxModern, children: [_jsx("button", { disabled: it.so_luong <= 1, onClick: () => updateQty(it.id, it.so_luong - 1), children: _jsx(Minus, { size: 14 }) }), _jsx("span", { children: it.so_luong }), _jsx("button", { onClick: () => updateQty(it.id, it.so_luong + 1), children: _jsx(Plus, { size: 14 }) })] }) }), _jsx("td", { className: styles.bold, children: formatCurrency(it.gia) }), _jsx("td", { children: _jsx("button", { className: styles.delStandalone, title: "Xo\u00E1", onClick: () => remove(it.id), children: _jsx(X, { size: 18 }) }) })] }, it.id))) })] }), _jsxs("aside", { className: styles.summary, children: [_jsx(PromoInput, { enabled: cartItems.length > 0, cartCount: cartItems.length, subTotal: subTotal, applied: promoApplied, onApply: () => setPromoApplied(true) }), _jsx("h3", { children: "T\u1ED5ng c\u1ED9ng" }), _jsx("p", { className: styles.money, children: formatCurrency(grandTotal) }), _jsxs("button", { className: styles.btn, onClick: goCheckout, children: [isLoggedIn ? _jsx(Package, { size: 18 }) : _jsx(LogIn, { size: 18 }), "\u00A0", isLoggedIn ? "THANH TOÁN" : "ĐĂNG NHẬP ĐỂ THANH TOÁN"] })] })] })), suggest.length > 0 && (_jsxs("section", { className: styles.suggest, children: [_jsx("h2", { children: "S\u1EA3n ph\u1EA9m g\u1EE3i \u00FD" }), _jsx("div", { className: styles.gridSuggest, children: suggest.map((p) => (_jsx(ProductCardMini, { p: p, onClick: () => nav(`/sanpham/${p.id}`), onAdd: async () => {
                                        optimisticAdd(p);
                                        await add({ productId: p.id, quantity: 1 });
                                        refresh();
                                    } }, p.id))) })] }))] }), _jsx(Footer, {})] }));
}
