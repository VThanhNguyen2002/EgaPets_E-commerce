import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// 📁 src/components/CartIcon/CartIcon.tsx
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import styles from "./CartIcon.module.css";
export default function CartIcon({ onClick }) {
    const count = useCartStore((s) => s.getCount());
    return (_jsxs("div", { className: styles.cartIcon, onClick: onClick, children: [count > 0 && _jsx("span", { className: styles.badge, children: count }), _jsx(ShoppingCart, { size: 24 }), _jsx("span", { className: styles.label, children: "Gi\u1ECF h\u00E0ng" })] }));
}
