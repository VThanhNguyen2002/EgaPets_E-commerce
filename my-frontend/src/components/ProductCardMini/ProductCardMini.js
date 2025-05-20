import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatCurrency } from "@/utils/formatCurrency";
import noImg from "@/assets/img-placeholder.png";
import styles from "./ProductCardMini.module.css";
export default function ProductCardMini({ p, onAdd, onClick }) {
    return (_jsxs("div", { className: styles.card, children: [_jsx("img", { src: p.thumb || noImg, onClick: onClick }), _jsx("span", { className: styles.name, children: p.ten_san_pham }), _jsx("b", { children: formatCurrency(p.finalPrice) }), _jsx("button", { className: styles.addBtn, onClick: onAdd, children: "+ Th\u00EAm" })] }));
}
