import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ProductHoverActions.module.css";
const ProductHoverActions = ({ wrapperClass, onQuickView, onCompare, }) => {
    return (_jsxs("div", { className: `${styles.hoverIcons} ${wrapperClass || ""}`, children: [_jsx("div", { className: styles.iconItem, onClick: onQuickView, children: "\uD83D\uDC41" }), _jsx("div", { className: styles.iconItem, onClick: onCompare, children: "\u21C4" })] }));
};
export default ProductHoverActions;
