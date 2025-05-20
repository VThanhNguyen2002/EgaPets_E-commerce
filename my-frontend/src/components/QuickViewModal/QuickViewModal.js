import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Star } from "lucide-react";
import styles from "./QuickViewModal.module.css";
import placeholder from "../common/placeholder/product.png";
export default function QuickViewModal({ product, isOpen, onClose }) {
    const [idx, setIdx] = useState(0);
    if (!isOpen || !product)
        return null;
    const imgs = [product.thumb, product.hover].filter(Boolean);
    const show = imgs[idx] ?? placeholder;
    const price = product.gia_thanh ?? 0;
    const sale = product.giam_gia ? Math.round(price * (1 - product.giam_gia / 100)) : price;
    return (_jsx("div", { className: styles.ovl, onClick: onClose, children: _jsxs("div", { className: styles.box, onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: styles.left, children: [_jsx("img", { src: show, alt: product.ten_san_pham, onError: e => e.currentTarget.src = placeholder }), imgs.length > 1 && (_jsx("div", { className: styles.thumbs, children: imgs.map((s, i) => (_jsx("img", { src: s, alt: "", className: i === idx ? styles.act : "", onClick: () => setIdx(i) }, i))) }))] }), _jsxs("div", { className: styles.right, children: [_jsx("h2", { className: styles.title, children: product.ten_san_pham }), _jsxs("p", { className: styles.price, children: [sale.toLocaleString(), "\u0111", product.giam_gia > 0 && _jsxs("span", { children: [price.toLocaleString(), "\u0111"] })] }), _jsxs("p", { className: styles.meta, children: ["Th\u01B0\u01A1ng hi\u1EC7u: ", _jsx("b", { children: product.thuong_hieu }), " \u00A0|\u00A0 Ngu\u1ED3n g\u1ED1c: ", _jsx("b", { children: product.nguon_goc }), " \u00A0|\u00A0 Kh\u1ED1i l\u01B0\u1EE3ng: ", _jsxs("b", { children: [product.so_gram, " g"] })] }), _jsxs("p", { className: styles.rating, children: [[...Array(5)].map((_, i) => (_jsx(Star, { size: 20, strokeWidth: 1.2, fill: i < Math.round(product.danh_gia) ? "#ffc400" : "none", stroke: i < Math.round(product.danh_gia) ? "#ffc400" : "#666" }, i))), "(", product.danh_gia, ")"] })] }), _jsx("button", { className: styles.close, onClick: onClose, children: "\u00D7" })] }) }));
}
