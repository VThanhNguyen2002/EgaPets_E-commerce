// ✅ File: src/pages/ChiTietSanPham/ChiTietSanPham.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ChiTietSanPham.module.css";
import Header from '@/layouts/Header/Header';
import Footer from '@/layouts/Footer/Footer';
import { FaCartPlus } from "react-icons/fa";
import { Product } from "../../types/Product";
import { fetchProductById } from "../../services/productService";

const ChiTietSanPham = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetchProductById(id)
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  if (!product) return <div className={styles.loading}>Đang tải sản phẩm...</div>;

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.contentWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={"/src/assets/SanPham1.jpg"}
            alt={product.ten_san_pham}
            className={styles.mainImage}
          />
        </div>

        <div className={styles.infoWrapper}>
          <h1 className={styles.productName}>{product.ten_san_pham}</h1>
          <p><strong>Thương hiệu:</strong> {product.thuong_hieu}</p>
          <p><strong>Loại:</strong> {product.loai}</p>
          <p><strong>Nguồn gốc:</strong> {product.nguon_goc}</p>
          <p><strong>Khối lượng:</strong> {product.so_gram}g</p>
          <p><strong>Hạn sử dụng:</strong> {new Date(product.han_su_dung).toLocaleDateString()}</p>
          <p className={styles.price}>Giá: {product.gia_thanh.toLocaleString()}đ</p>
          {product.giam_gia > 0 && (
            <p className={styles.discount}>Giảm giá: {product.giam_gia}%</p>
          )}
          <p><strong>Đánh giá:</strong> {product.danh_gia} ⭐</p>
          <p><strong>Thành phần:</strong> {product.thanh_phan}</p>

          <button className={styles.cartButton}>
            <FaCartPlus /> Thêm vào giỏ hàng
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChiTietSanPham;