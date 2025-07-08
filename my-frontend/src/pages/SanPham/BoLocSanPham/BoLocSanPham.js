import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/BoLocSanPham/BoLocSanPham.tsx
import { useEffect, useState } from "react";
import styles from "./BoLocSanPham.module.css";
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import { fetchAllProducts } from "../../../services/productService";
import { Link } from "react-router-dom";
import SanPham1 from "../../../assets/SanPham1.jpg";
const BoLocSanPham = () => {
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        thuong_hieu: "",
        loai: "",
        nguon_goc: "",
        danh_muc_id: "",
        gia_thanh: "",
        danh_gia: "",
    });
    useEffect(() => {
        fetchAllProducts()
            .then((data) => setProducts(data))
            .catch((err) => console.error("Lỗi khi fetch danh sách sản phẩm:", err));
    }, []);
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };
    const filtered = products.filter((p) => {
        return ((!filters.thuong_hieu || p.thuong_hieu === filters.thuong_hieu) &&
            (!filters.loai || p.loai === filters.loai) &&
            (!filters.nguon_goc || p.nguon_goc === filters.nguon_goc) &&
            (!filters.danh_muc_id || p.danh_muc_id === Number(filters.danh_muc_id)) &&
            (!filters.danh_gia || p.danh_gia >= Number(filters.danh_gia)));
    });
    return (_jsxs("div", { className: styles.filterPage, children: [_jsx(Header, {}), _jsx("h2", { children: "B\u1ED9 l\u1ECDc s\u1EA3n ph\u1EA9m" }), _jsxs("div", { className: styles.filterControls, children: [_jsxs("select", { name: "thuong_hieu", onChange: handleFilterChange, children: [_jsx("option", { value: "", children: "Th\u01B0\u01A1ng hi\u1EC7u" }), _jsx("option", { value: "Royal Canin", children: "Royal Canin" }), _jsx("option", { value: "Whiskas", children: "Whiskas" }), _jsx("option", { value: "Pedigree", children: "Pedigree" })] }), _jsxs("select", { name: "loai", onChange: handleFilterChange, children: [_jsx("option", { value: "", children: "Lo\u1EA1i" }), _jsx("option", { value: "Th\u1EE9c \u0103n cho ch\u00F3", children: "Th\u1EE9c \u0103n cho ch\u00F3" }), _jsx("option", { value: "Th\u1EE9c \u0103n cho m\u00E8o", children: "Th\u1EE9c \u0103n cho m\u00E8o" }), _jsx("option", { value: "B\u00E1nh th\u01B0\u1EDFng cho m\u00E8o", children: "B\u00E1nh th\u01B0\u1EDFng cho m\u00E8o" })] }), _jsxs("select", { name: "nguon_goc", onChange: handleFilterChange, children: [_jsx("option", { value: "", children: "Ngu\u1ED3n g\u1ED1c" }), _jsx("option", { value: "Ph\u00E1p", children: "Ph\u00E1p" }), _jsx("option", { value: "M\u1EF9", children: "M\u1EF9" }), _jsx("option", { value: "Th\u00E1i Lan", children: "Th\u00E1i Lan" })] }), _jsxs("select", { name: "danh_gia", onChange: handleFilterChange, children: [_jsx("option", { value: "", children: "\u0110\u00E1nh gi\u00E1" }), _jsx("option", { value: "4.5", children: "Tr\u00EAn 4.5 sao" }), _jsx("option", { value: "4.8", children: "Tr\u00EAn 4.8 sao" })] })] }), _jsx("div", { className: styles.grid, children: filtered.map((p) => (_jsxs(Link, { to: `/sanpham/${p.id}`, className: styles.card, children: [_jsx("img", { src: SanPham1, alt: p.ten_san_pham }), _jsx("h3", { children: p.ten_san_pham }), _jsxs("p", { children: [p.gia_thanh.toLocaleString(), "\u0111"] })] }, p.id))) }), _jsx(Footer, {})] }));
};
export default BoLocSanPham;
