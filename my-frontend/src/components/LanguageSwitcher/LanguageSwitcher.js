import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import styles from "./LanguageSwitcher.module.css";
// Giả sử bạn có sẵn cờ trong thư mục assets/flags:
import vietnamFlag from "../../assets/vietnam.jpg";
import usaFlag from "../../assets/usa.jpg";
const LanguageSwitcher = () => {
    const [language, setLanguage] = useState("vi");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null); // Tham chiếu đến div chứa menu
    // Chọn cờ hiển thị
    const flagSrc = language === "vi" ? vietnamFlag : usaFlag;
    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (_jsxs("div", { className: styles.languageSwitcher, ref: dropdownRef, children: [_jsx("button", { className: styles.langButton, onClick: () => setIsOpen(!isOpen), children: _jsx("img", { src: flagSrc, alt: "flag", className: styles.flagIcon }) }), isOpen && (_jsxs("ul", { className: styles.dropdown, children: [_jsx("li", { onClick: () => { setLanguage("vi"); setIsOpen(false); }, children: "\uD83C\uDDFB\uD83C\uDDF3 Ti\u1EBFng Vi\u1EC7t" }), _jsx("li", { onClick: () => { setLanguage("en"); setIsOpen(false); }, children: "\uD83C\uDDFA\uD83C\uDDF8 Ti\u1EBFng Anh" })] }))] }));
};
export default LanguageSwitcher;
