import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ✅ File: src/pages/ChiTietSanPham/ChiTietSanPham.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ChiTietSanPham.module.css";
import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';
import { FaCartPlus } from "react-icons/fa";
import { fetchProductById } from "../../services/productService";
const ChiTietSanPham = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        if (id)
            fetchProductById(+id)
                .then(setProduct)
                .catch(console.error);
    }, [id]);
    if (!product)
        return _jsx("div", { className: styles.loading, children: "\u0110ang t\u1EA3i s\u1EA3n ph\u1EA9m..." });
    return (_jsxs("div", { className: styles.pageContainer, children: [_jsx(Header, {}), _jsxs("div", { className: styles.contentWrapper, children: [_jsx("div", { className: styles.imageWrapper, children: _jsx("img", { src: "/src/assets/SanPham1.jpg", alt: product.ten_san_pham, className: styles.mainImage }) }), _jsxs("div", { className: styles.infoWrapper, children: [_jsx("h1", { className: styles.productName, children: product.ten_san_pham }), _jsxs("p", { children: [_jsx("strong", { children: "Th\u01B0\u01A1ng hi\u1EC7u:" }), " ", product.thuong_hieu] }), _jsxs("p", { children: [_jsx("strong", { children: "Lo\u1EA1i:" }), " ", product.loai] }), _jsxs("p", { children: [_jsx("strong", { children: "Ngu\u1ED3n g\u1ED1c:" }), " ", product.nguon_goc] }), _jsxs("p", { children: [_jsx("strong", { children: "Kh\u1ED1i l\u01B0\u1EE3ng:" }), " ", product.so_gram, "g"] }), _jsxs("p", { children: [_jsx("strong", { children: "H\u1EA1n s\u1EED d\u1EE5ng:" }), " ", new Date(product.han_su_dung).toLocaleDateString()] }), _jsxs("p", { className: styles.price, children: ["Gi\u00E1: ", product.gia_thanh.toLocaleString(), "\u0111"] }), product.giam_gia > 0 && (_jsxs("p", { className: styles.discount, children: ["Gi\u1EA3m gi\u00E1: ", product.giam_gia, "%"] })), _jsxs("p", { children: [_jsx("strong", { children: "\u0110\u00E1nh gi\u00E1:" }), " ", product.danh_gia, " \u2B50"] }), _jsxs("p", { children: [_jsx("strong", { children: "Th\u00E0nh ph\u1EA7n:" }), " ", product.thanh_phan] }), _jsxs("button", { className: styles.cartButton, children: [_jsx(FaCartPlus, {}), " Th\u00EAm v\u00E0o gi\u1ECF h\u00E0ng"] })] })] }), _jsx(Footer, {})] }));
};
export default ChiTietSanPham;
