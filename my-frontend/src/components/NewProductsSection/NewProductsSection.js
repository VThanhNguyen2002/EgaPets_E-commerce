import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./NewProductsSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";
import useProducts from "../../hooks/useProducts";
import ProductCard from "../common/ProductCard/ProductCard";
import IntroSanPhamMoi from "../../assets/IntroSanPhamMoi.jpg";
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import CompareBar from "../CompareBar/CompareBar";
export default function NewProductsSection() {
    const [items, setItems] = useState([]);
    const [loading, setLoad] = useState(true);
    const [quick, setQuick] = useState(false);
    const [curr, setCurr] = useState(null);
    const [cmp, setCmp] = useState([]);
    /* lấy 7 sản phẩm mới nhất */
    useEffect(() => {
        fetchNewestProducts(7).then((data) => {
            setItems(Array.isArray(data) ? data : []);
            setLoad(false);
        });
    }, []);
    const renderCard = (p) => (_jsx(ProductCard, { data: p, onQuickView: () => { setCurr(p); setQuick(true); }, onCompare: () => {
            setCmp((prev) => prev.find((x) => x.id === p.id)
                ? prev.filter((x) => x.id !== p.id)
                : prev.length >= 3
                    ? (alert("Tối đa 3 sản phẩm!"), prev)
                    : [...prev, p]);
        } }, p.id));
    return (_jsxs("div", { className: styles.section, children: [_jsx("h2", { className: sharedStyles.sectionTitle, children: "S\u1EA3n ph\u1EA9m m\u1EDBi" }), _jsxs("div", { className: styles.content, children: [_jsx("div", { className: styles.left, children: _jsx("img", { src: IntroSanPhamMoi, className: styles.banner, alt: "Banner sale" }) }), _jsxs("div", { className: styles.right, children: [_jsx("div", { className: styles.grid, children: loading
                                    ? _jsx("p", { style: { gridColumn: "1/-1" }, children: "\u0110ang t\u1EA3i\u2026" })
                                    : items.map(renderCard) }), _jsx("div", { className: styles.viewAll, children: _jsx("button", { children: "Xem t\u1EA5t c\u1EA3 \u00BB" }) })] })] }), _jsx(QuickViewModal, { product: curr, isOpen: quick, onClose: () => setQuick(false) }), _jsx(CompareBar, { compareList: cmp, onRemoveItem: (id) => setCmp(cmp.filter((x) => x.id !== id)), onClearAll: () => setCmp([]), onCompareNow: () => alert("So sánh ngay!") })] }));
}
