import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./SideCategory.module.css";
import { FaTimes } from "react-icons/fa";
const SideCategory = ({ onClose }) => {
    return (_jsx("div", { className: styles.overlay, children: _jsxs("div", { className: styles.sideMenu, children: [_jsx("button", { className: styles.closeBtn, onClick: onClose, children: _jsx(FaTimes, {}) }), _jsx("h2", { children: "Danh m\u1EE5c s\u1EA3n ph\u1EA9m" }), _jsxs("ul", { className: styles.catList, children: [_jsx("li", { children: "Th\u1EE9c \u0103n cho m\u00E8o" }), _jsx("li", { children: "\u0110\u1ED3 ch\u01A1i" }), _jsx("li", { children: "Gi\u01B0\u1EDDng - N\u1EC7m" }), _jsx("li", { children: "Ph\u1EE5 ki\u1EC7n" })] })] }) }));
};
export default SideCategory;
