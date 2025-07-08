import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Footer.module.css";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { FaFacebookF, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
// Logo: 
import logoEgaPets from "../../assets/Logo.jpg";
// (đường dẫn tuỳ dự án của bạn)
import logoMomo from "../../assets/Momo.jpg";
// ...và các logo thanh toán khác (Visa, MasterCard...), 
// tuỳ bạn import nếu có
const Footer = () => {
    const handleSubscribe = () => {
        // Kiểm tra localhost
        if (window.location.hostname === "localhost") {
            alert("Cảm ơn bạn đã đăng ký (localhost)!");
        }
        else {
            alert("Cảm ơn bạn đã đăng ký!");
        }
    };
    return (_jsxs("footer", { className: styles.footer, children: [_jsxs("div", { className: styles.topRow, children: [_jsxs("div", { className: styles.logoAndAddress, children: [_jsx("img", { src: logoEgaPets, alt: "EGA Pets", className: styles.logo }), _jsxs("p", { children: [_jsx(FaMapMarkerAlt, { className: styles.icon }), "\u0110\u1ECBa ch\u1EC9: ", _jsx("span", { className: styles.highlight, children: "180 Nguy\u1EC5n V\u0103n Qu\u00E1, Qu\u1EADn 12, TP.HCM" })] }), _jsxs("p", { children: [_jsx(FaPhoneAlt, { className: styles.icon }), "Hotline: ", _jsx("span", { className: styles.highlight, children: "0999999999" })] }), _jsxs("p", { children: [_jsx(HiMail, { className: styles.icon }), "Email: ", _jsx("span", { className: styles.highlight, children: "support@egany.com" })] }), _jsxs("div", { className: styles.socialIcons, children: [_jsx("a", { href: "https://facebook.com", target: "_blank", rel: "noreferrer", children: _jsx(FaFacebookF, {}) }), _jsx("a", { href: "https://youtube.com", target: "_blank", rel: "noreferrer", children: _jsx(FaYoutube, {}) }), _jsx("a", { href: "https://tiktok.com", target: "_blank", rel: "noreferrer", children: _jsx(FaTiktok, {}) }), _jsx("a", { href: "https://instagram.com", target: "_blank", rel: "noreferrer", children: _jsx(FaInstagram, {}) }), _jsx("a", { href: "https://zalo.me", target: "_blank", rel: "noreferrer", children: _jsx(SiZalo, {}) })] })] }), _jsxs("div", { className: styles.footerLinks, children: [_jsx("h4", { children: "H\u1ED7 tr\u1EE3 kh\u00E1ch h\u00E0ng" }), _jsxs("ul", { children: [_jsx("li", { children: "C\u00E2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p" }), _jsx("li", { children: "H\u1EC7 th\u1ED1ng c\u1EEDa h\u00E0ng" }), _jsx("li", { children: "T\u00ECm ki\u1EBFm" }), _jsx("li", { children: "Gi\u1EDBi thi\u1EC7u" }), _jsx("li", { children: "Li\u00EAn h\u1EC7" })] })] }), _jsxs("div", { className: styles.footerLinks, children: [_jsx("h4", { children: "Ch\u00EDnh s\u00E1ch" }), _jsxs("ul", { children: [_jsx("li", { children: "Ch\u00EDnh s\u00E1ch \u0111\u1ED5i tr\u1EA3" }), _jsx("li", { children: "Ch\u00EDnh s\u00E1ch b\u1EA3o m\u1EADt" }), _jsx("li", { children: "\u0110i\u1EC1u kho\u1EA3n d\u1ECBch v\u1EE5" })] }), _jsx("h4", { children: "T\u1ED5ng \u0111\u00E0i h\u1ED7 tr\u1EE3" }), _jsxs("ul", { children: [_jsx("li", { children: "G\u1ECDi mua h\u00E0ng: 0999999999 (8h-20h)" }), _jsx("li", { children: "G\u1ECDi b\u1EA3o h\u00E0nh: 19009999 (8h-20h)" })] })] }), _jsxs("div", { className: styles.newsletter, children: [_jsx("h4", { children: "\u0110\u0103ng k\u00FD nh\u1EADn \u01B0u \u0111\u00E3i" }), _jsx("p", { children: "B\u1EA1n mu\u1ED1n nh\u1EADn khuy\u1EBFn m\u00E3i \u0111\u1EB7c bi\u1EC7t? \u0110\u0103ng k\u00ED tham gia ngay c\u00F9ng h\u01A1n 68.000+ ng\u01B0\u1EDDi theo d\u00F5i c\u1EE7a ch\u00FAng t\u00F4i \u0111\u1EC3 c\u1EADp nh\u1EADt khuy\u1EBFn m\u00E3i..." }), _jsxs("div", { className: styles.subscribeBox, children: [_jsx("input", { type: "email", placeholder: "Email c\u1EE7a b\u1EA1n...", "aria-label": "Nh\u1EADp email" }), _jsx("button", { onClick: handleSubscribe, children: "\u0110\u0103ng k\u00FD" })] }), _jsx("div", { className: styles.paymentMethods, children: _jsx("img", { src: logoMomo, alt: "Momo" }) })] })] }), _jsx("div", { className: styles.bottomRow, children: _jsx("p", { children: "\u00A9 B\u1EA3n quy\u1EC1n thu\u1ED9c v\u1EC1 EGANY | Cung c\u1EA5p b\u1EDFi Haravan" }) })] }));
};
export default Footer;
