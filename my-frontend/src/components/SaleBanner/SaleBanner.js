import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./SaleBanner.module.css";
const SaleBanner = () => {
    const handleCopy = () => {
        // Copy code EGA50 vào clipboard
        navigator.clipboard.writeText("EGA50");
        alert("Đã sao chép mã EGA50!");
    };
    return (_jsxs("div", { className: styles.saleBanner, children: [_jsx("h3", { children: "MUA NHI\u1EC0U GI\u1EA2M S\u00C2U - gi\u1EA3m \u0111\u1EBFn 50%! Ch\u1EC9 1 tu\u1EA7n duy nh\u1EA5t!!!" }), _jsxs("div", { className: styles.saleActions, children: [_jsx("button", { children: "Mua ngay" }), _jsx("button", { children: "EGA50" }), _jsx("button", { onClick: handleCopy, children: "Sao ch\u00E9p" })] })] }));
};
export default SaleBanner;
