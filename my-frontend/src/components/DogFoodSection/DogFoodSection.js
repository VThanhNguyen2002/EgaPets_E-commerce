import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import styles from "./DogFoodSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../common/ProductCard/ProductCard";
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import CompareBar from "../CompareBar/CompareBar";
const TABS = [
    { key: "dry", label: "Thức ăn khô", type: "Thức ăn cho chó" },
    { key: "snack", label: "Bánh thưởng", type: "Bánh thưởng cho chó" },
];
export default function DogFoodSection() {
    const [activeTab, setActiveTab] = useState("dry");
    const { products, loading } = useProducts(TABS.find((t) => t.key === activeTab).type);
    const [quick, setQuick] = useState(false);
    const [current, setCurrent] = useState(null);
    const [compare, setCompare] = useState([]);
    const renderCard = (p) => (_jsx(ProductCard, { data: p, onQuickView: () => { setCurrent(p); setQuick(true); }, onCompare: () => {
            setCompare((prev) => prev.find((x) => x.id === p.id)
                ? prev.filter((x) => x.id !== p.id)
                : prev.length >= 3
                    ? (alert("Chỉ so sánh tối đa 3 sản phẩm!"), prev)
                    : [...prev, p]);
        } }, p.id));
    return (_jsx("section", { className: styles.sectionWrap, children: _jsxs("div", { className: styles.section, children: [_jsx("h2", { className: sharedStyles.sectionTitle, children: "Dinh d\u01B0\u1EE1ng cho ch\u00F3 \uD83D\uDC36" }), _jsx("div", { className: styles.tabButtons, children: TABS.map((t) => (_jsx("button", { className: activeTab === t.key ? styles.activeTab : "", onClick: () => setActiveTab(t.key), children: t.label }, t.key))) }), _jsx("div", { className: styles.grid, children: loading ? (_jsx("p", { style: { gridColumn: "1/-1" }, children: "\u0110ang t\u1EA3i\u2026" })) : products.length ? (products.slice(0, 6).map(renderCard)) : (_jsx("p", { style: { gridColumn: "1/-1" }, children: "Ch\u01B0a c\u00F3 s\u1EA3n ph\u1EA9m." })) }), _jsx(QuickViewModal, { product: current, isOpen: quick, onClose: () => setQuick(false) }), _jsx(CompareBar, { compareList: compare, onRemoveItem: (id) => setCompare(compare.filter((x) => x.id !== id)), onClearAll: () => setCompare([]), onCompareNow: () => alert("So sánh ngay!") })] }) }));
}
