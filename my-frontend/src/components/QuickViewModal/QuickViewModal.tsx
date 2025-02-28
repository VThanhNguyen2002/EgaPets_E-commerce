import React from "react";
import styles from "./QuickViewModal.module.css";
import { Product } from "../CatFoodSection/CatFoodSection"; 
// Hoặc import từ file “types” nếu bạn tách type riêng

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null; // không hiển thị nếu isOpen = false hoặc chưa có product

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles.productInfo}>
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>Giá: {product.price.toLocaleString()}đ</p>
          {product.oldPrice && <p>Giá cũ: {product.oldPrice.toLocaleString()}đ</p>}
          {/* Thêm mô tả, rating, v.v... tuỳ dự án */}
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
