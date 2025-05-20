import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";
import { decodeSlug } from "./breadcrumbUtils";
const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    // Custom breadcrumb cho checkout
    if (location.pathname === "/checkout") {
        return (_jsxs("nav", { className: styles.breadcrumbWrapper, children: [_jsx(Link, { to: "/cart", className: styles.link, children: "Gi\u1ECF h\u00E0ng" }), _jsx("span", { className: styles.separator, children: "/" }), _jsx("span", { className: styles.current, children: "Th\u00F4ng tin giao h\u00E0ng" })] }));
    }
    // Mặc định
    return (_jsxs("nav", { className: styles.breadcrumbWrapper, children: [_jsx(Link, { to: "/", className: styles.link, children: "Trang ch\u1EE7" }), pathnames.map((value, index) => {
                const to = "/" + pathnames.slice(0, index + 1).join("/");
                const isLast = index === pathnames.length - 1;
                return (_jsxs("span", { children: [_jsx("span", { className: styles.separator, children: "/" }), isLast ? (_jsx("span", { className: styles.current, children: decodeSlug(value) })) : (_jsx(Link, { to: to, className: styles.link, children: decodeSlug(value) }))] }, to));
            })] }));
};
export default Breadcrumbs;
