import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./CategoryDropdown.module.css";
const categories = ["Thức ăn cho mèo", "Đồ chơi cho mèo", "Giường - Nệm cho mèo"];
const CategoryDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (_jsxs("div", { className: styles.dropdown, children: [_jsx("button", { onClick: () => setIsOpen(!isOpen), className: styles.dropdownButton, children: "Danh m\u1EE5c s\u1EA3n ph\u1EA9m" }), isOpen && (_jsx("ul", { className: styles.dropdownMenu, children: categories.map((category) => (_jsx("li", { className: styles.dropdownItem, children: category }, category))) }))] }));
};
export default CategoryDropdown;
