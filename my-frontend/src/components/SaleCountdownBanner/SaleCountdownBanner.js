import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import styles from "./SaleCountdownBanner.module.css";
const SaleCountdownBanner = () => {
    // 24h = 24 * 60 * 60 = 86400 giây
    // Chúng ta lưu countdown dưới dạng giây
    const [timeLeft, setTimeLeft] = useState(86400);
    // Mỗi giây giảm timeLeft, khi chạm 0 -> reset về 86400
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1)
                    return 86400; // reset
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    // Tách ra giờ/phút/giây
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return (_jsxs("div", { className: styles.saleBanner, children: [_jsx("h2", { className: styles.bannerTitle, children: "Ch\u1EDBp th\u1EDDi c\u01A1. Gi\u00E1 nh\u01B0 m\u01A1!" }), _jsxs("div", { className: styles.countdownWrapper, children: [_jsx("span", { className: styles.remind, children: "Nhanh l\u00EAn n\u00E0o!" }), _jsx("span", { className: styles.text, children: "S\u1EF1 ki\u1EC7n s\u1EBD k\u1EBFt th\u00FAc sau" }), _jsxs("div", { className: styles.countdownBox, children: [_jsxs("div", { className: styles.countdownItem, children: [hours < 10 ? `0${hours}` : hours, _jsx("span", { children: "Gi\u1EDD" })] }), _jsxs("div", { className: styles.countdownItem, children: [minutes < 10 ? `0${minutes}` : minutes, _jsx("span", { children: "Ph\u00FAt" })] }), _jsxs("div", { className: styles.countdownItem, children: [seconds < 10 ? `0${seconds}` : seconds, _jsx("span", { children: "Gi\u00E2y" })] })] })] })] }));
};
export default SaleCountdownBanner;
