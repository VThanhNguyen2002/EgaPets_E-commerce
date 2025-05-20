import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./NavBar.module.css";
import SideCategory from "../SideCategory/SideCategory";
import { FaAngleDown, FaBars, FaStore, FaPhoneAlt } from "react-icons/fa";
const NavBar = () => {
    const [showSideCat, setShowSideCat] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    // Menu data
    const menuItems = [
        { name: "Danh mục sản phẩm", isCategory: true },
        { name: "Mèo", dropdown: ["Thức ăn mèo", "Phụ kiện - Đồ chơi"] },
        { name: "Today's Sale", dropdown: ["Flash Sale", "Combo Ưu Đãi"] },
        { name: "Dịch vụ chăm Pets" },
        { name: "Tạp chí chăm Boss" },
        { name: "Hệ thống cửa hàng", icon: _jsx(FaStore, {}) },
        { name: "Hotline: 099999998", icon: _jsx(FaPhoneAlt, {}) }
    ];
    const handleCatClick = () => setShowSideCat(true);
    const closeSideCat = () => setShowSideCat(false);
    return (_jsxs(_Fragment, { children: [_jsx("nav", { className: styles.navbar, children: _jsx("ul", { className: styles.navList, children: menuItems.map((item, idx) => {
                        // 1) Danh mục sản phẩm => sideCategory
                        if (item.isCategory) {
                            return (_jsx("li", { className: styles.navItem, children: _jsxs("button", { className: `${styles.navLink} ${styles.catButton}`, onClick: handleCatClick, children: [_jsx(FaBars, { className: styles.icon }), item.name] }) }, idx));
                        }
                        // 2) Mèo / Today's Sale => dropdown
                        if (item.dropdown) {
                            return (_jsxs("li", { className: styles.navItem, onMouseEnter: () => setHoveredItem(item.name), onMouseLeave: () => setHoveredItem(null), children: [_jsxs("span", { className: styles.navLink, children: [item.name, " ", _jsx(FaAngleDown, {})] }), hoveredItem === item.name && (_jsx("div", { className: styles.megaMenu, children: _jsx("div", { className: styles.megaMenuContent, children: item.dropdown.map((sub, i) => (_jsxs("div", { className: styles.megaMenuColumn, children: [_jsx("h4", { children: sub }), _jsxs("ul", { children: [_jsx("li", { children: "Item 1" }), _jsx("li", { children: "Item 2" })] })] }, i))) }) }))] }, idx));
                        }
                        // 3) Link thường + icon (nếu có)
                        return (_jsx("li", { className: styles.navItem, children: _jsxs("a", { href: "#", className: styles.navLink, children: [item.icon && _jsx("span", { className: styles.linkIcon, children: item.icon }), item.name] }) }, idx));
                    }) }) }), showSideCat && _jsx(SideCategory, { onClose: closeSideCat })] }));
};
export default NavBar;
