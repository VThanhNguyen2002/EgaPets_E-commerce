// src/pages/BoLocSanPham/BoLocSanPham.tsx
import React, { useEffect, useState } from "react";
import styles from "./BoLocSanPham.module.css";
import Header from "../../../layouts/Header/Header";
import Footer from "../../../layouts/Footer/Footer";
import { Product } from "../../../types/Product";
import { fetchAllProducts } from "../../../services/productService";
import { Link } from "react-router-dom";

const BoLocSanPham = () => {
  const [products, setProducts] = useState<Product[]>([]);
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filtered = products.filter((p) => {
    return (
      (!filters.thuong_hieu || p.thuong_hieu === filters.thuong_hieu) &&
      (!filters.loai || p.loai === filters.loai) &&
      (!filters.nguon_goc || p.nguon_goc === filters.nguon_goc) &&
      (!filters.danh_muc_id || p.danh_muc_id === Number(filters.danh_muc_id)) &&
      (!filters.danh_gia || p.danh_gia >= Number(filters.danh_gia))
    );
  });

  return (
    <div className={styles.filterPage}>
      <Header />

      <h2>Bộ lọc sản phẩm</h2>
      <div className={styles.filterControls}>
        <select name="thuong_hieu" onChange={handleFilterChange}>
          <option value="">Thương hiệu</option>
          <option value="Royal Canin">Royal Canin</option>
          <option value="Whiskas">Whiskas</option>
          <option value="Pedigree">Pedigree</option>
        </select>
        <select name="loai" onChange={handleFilterChange}>
          <option value="">Loại</option>
          <option value="Thức ăn cho chó">Thức ăn cho chó</option>
          <option value="Thức ăn cho mèo">Thức ăn cho mèo</option>
          <option value="Bánh thưởng cho mèo">Bánh thưởng cho mèo</option>
        </select>
        <select name="nguon_goc" onChange={handleFilterChange}>
          <option value="">Nguồn gốc</option>
          <option value="Pháp">Pháp</option>
          <option value="Mỹ">Mỹ</option>
          <option value="Thái Lan">Thái Lan</option>
        </select>
        <select name="danh_gia" onChange={handleFilterChange}>
          <option value="">Đánh giá</option>
          <option value="4.5">Trên 4.5 sao</option>
          <option value="4.8">Trên 4.8 sao</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filtered.map((p) => (
          <Link to={`/sanpham/${p.id}`} key={p.id} className={styles.card}>
            <img src={"/src/assets/SanPham1.jpg"} alt={p.ten_san_pham} />
            <h3>{p.ten_san_pham}</h3>
            <p>{p.gia_thanh.toLocaleString()}đ</p>
          </Link>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BoLocSanPham;
