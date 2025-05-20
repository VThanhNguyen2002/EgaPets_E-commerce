import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// src/layouts/Header/Header.tsx
import { useState } from "react";
import styles from "./Header.module.css";
import LanguageSwitcher from "../../components/LanguageSwitcher/LanguageSwitcher";
import CartIcon from "../../components/CartIcon/CartIcon";
import SearchBar from "../../components/SearchBar/SearchBar";
import AuthButton from "../../components/AuthButton/AuthButton";
import logo from "../../assets/Logo.jpg";
import NavBar from "../../components/NavBar/NavBar";
import CartSidebar from "../../components/CartSidebar/CartSidebar";
import { useNavigate } from "react-router-dom";
const Header = () => {
    const [showCart, setShowCart] = useState(false);
    const navigate = useNavigate();
    return (_jsxs(_Fragment, { children: [_jsxs("header", { children: [_jsxs("div", { className: styles.headerTop, children: [_jsx("div", { className: styles.logoWrapper, onClick: () => navigate("/"), style: { cursor: "pointer" }, children: _jsx("img", { src: logo, alt: "EGA PETS", className: styles.logoImg }) }), _jsx("div", { className: styles.searchArea, children: _jsx(SearchBar, {}) }), _jsxs("div", { className: styles.actions, children: [_jsx(LanguageSwitcher, {}), _jsx(AuthButton, {}), _jsx(CartIcon, { onClick: () => setShowCart(true) })] })] }), _jsx(NavBar, {})] }), showCart && _jsx(CartSidebar, { isOpen: showCart, onClose: () => setShowCart(false) })] }));
};
export default Header;
