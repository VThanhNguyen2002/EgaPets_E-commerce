import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import styles from "./FloatingIcons.module.css";
import { FaPhoneAlt, FaChevronUp } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { BsMessenger } from "react-icons/bs";
const FloatingIcons = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    // Lắng nghe scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowScrollTop(true);
            }
            else {
                setShowScrollTop(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        // Clear event khi unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // Gọi điện
    const handleCallClick = () => {
        const confirmCall = window.confirm("Bạn muốn mở ứng dụng gọi điện?");
        if (confirmCall) {
            window.location.href = "tel:19006750";
        }
    };
    // Zalo
    const handleZaloClick = () => {
        alert("Chat với chúng tôi qua Zalo");
        window.open("https://zalo.me/", "_blank");
    };
    // Messenger
    const handleMessengerClick = () => {
        alert("Chat với chúng tôi qua Messenger");
        window.open("https://m.me/", "_blank");
    };
    // Lên đầu trang
    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (_jsxs("div", { className: styles.floatingIcons, children: [_jsx("button", { className: `${styles.icon} ${styles.zalo}`, onClick: handleZaloClick, title: "Chat v\u1EDBi ch\u00FAng t\u00F4i qua Zalo", children: _jsx(SiZalo, { className: styles.iconSvg }) }), _jsx("button", { className: `${styles.icon} ${styles.messenger}`, onClick: handleMessengerClick, title: "Chat v\u1EDBi ch\u00FAng t\u00F4i qua Messenger", children: _jsx(BsMessenger, { className: styles.iconSvg }) }), _jsx("button", { className: `${styles.icon} ${styles.call}`, onClick: handleCallClick, title: "G\u1ECDi ngay cho ch\u00FAng t\u00F4i", children: _jsx(FaPhoneAlt, { className: styles.iconSvg }) }), showScrollTop && (_jsx("button", { className: `${styles.icon} ${styles.scrollUp}`, onClick: handleScrollTop, title: "L\u00EAn \u0111\u1EA7u trang", children: _jsx(FaChevronUp, { className: styles.iconSvg }) }))] }));
};
export default FloatingIcons;
