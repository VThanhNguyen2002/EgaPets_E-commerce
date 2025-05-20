import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Eye, Scale, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../../store/cartStore";
import { cartApi } from "../../../services/cartApi";
import styles from "./ProductCard.module.css";
import placeholder from "../placeholder/product.png";
const getThumb = (p) => p.thumb || placeholder;
const getHover = (p) => p.hover || null;
export default function ProductCard({ data, onQuickView, onCompare }) {
    const { refresh } = useCartStore();
    const base = data.gia_thanh ?? 0;
    const sale = data.giam_gia ? Math.round(base * (1 - data.giam_gia / 100)) : base;
    const name = data.ten_san_pham;
    const thumbUrl = getThumb(data);
    const hoverUrl = getHover(data);
    const hasHover = Boolean(hoverUrl);
    const addToCart = async () => {
        try {
            await cartApi.add({ productId: data.id, quantity: 1 });
            await refresh();
        }
        catch (e) {
            alert(e.message);
        }
    };
    return (_jsxs("div", { className: styles.card, children: [_jsxs("div", { className: `${styles.imgWrap} ${hasHover ? styles.hasHover : ""}`, children: [_jsx("img", { src: thumbUrl, alt: name, className: styles.img, onError: (e) => (e.currentTarget.src = placeholder) }), hasHover && (_jsx("img", { src: hoverUrl, alt: "", className: `${styles.img} ${styles.imgHover}`, onError: (e) => (e.currentTarget.style.display = "none") })), _jsxs("div", { className: styles.hoverIcons, children: [_jsx("button", { onClick: onQuickView, children: _jsx(Eye, { size: 24 }) }), _jsx("button", { onClick: onCompare, children: _jsx(Scale, { size: 24 }) })] }), data.giam_gia > 0 && _jsxs("span", { className: styles.badge, children: ["-", data.giam_gia, "%"] })] }), _jsxs("div", { className: styles.textZone, children: [_jsx("h3", { className: styles.name, title: name, children: name }), _jsxs("div", { className: styles.bottomRow, children: [_jsxs("span", { className: styles.price, children: [sale.toLocaleString(), "\u0111"] }), data.giam_gia > 0 && (_jsxs("span", { className: styles.oldPrice, children: [base.toLocaleString(), "\u0111"] })), _jsx("button", { className: styles.cartBtn, onClick: addToCart, children: _jsx(ShoppingCart, { size: 18 }) })] })] })] }));
}
