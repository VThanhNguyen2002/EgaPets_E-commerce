import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./CompareBar.module.css";
export default function CompareBar({ compareList, onRemoveItem, onClearAll, onCompareNow, }) {
    const [collapsed, setCollapsed] = useState(false);
    if (!compareList.length)
        return null;
    /* tối đa 3 slot – render ô rỗng cho đẹp */
    const slots = [...compareList];
    while (slots.length < 3)
        slots.push(null);
    return (_jsx("div", { className: `${styles.bar} ${collapsed ? styles.hide : ""}`, children: collapsed ? (_jsxs("button", { className: styles.floatBtn, onClick: () => setCollapsed(false), children: ["So s\u00E1nh\u00A0(", compareList.length, ") \u25B6"] })) : (_jsxs(_Fragment, { children: [_jsxs("header", { className: styles.header, children: [_jsxs("span", { children: ["So s\u00E1nh (", compareList.length, ")"] }), _jsx("button", { onClick: () => setCollapsed(true), children: "Thu g\u1ECDn" })] }), _jsx("div", { className: styles.items, children: slots.map((p, i) => (_jsx("div", { className: styles.item, children: p ? (_jsxs(_Fragment, { children: [_jsx("img", { src: p.thumb, alt: p.ten_san_pham }), _jsx("span", { title: p.ten_san_pham, children: p.ten_san_pham }), _jsx("button", { onClick: () => onRemoveItem(p.id), children: "\u00D7" })] })) : (_jsx("div", { className: styles.empty, children: "+" })) }, i))) }), _jsxs("div", { className: styles.actions, children: [_jsx("button", { className: styles.primary, onClick: onCompareNow, children: "So s\u00E1nh ngay" }), _jsx("button", { onClick: onClearAll, children: "X\u00F3a t\u1EA5t c\u1EA3" })] })] })) }));
}
