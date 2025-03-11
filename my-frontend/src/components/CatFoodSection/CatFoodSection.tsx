import React, { useState } from "react";
import styles from "./CatFoodSection.module.css";
import QuickViewModal from "../QuickViewModal/QuickViewModal";
import ProductHoverActions from "../ProductHoverActions/ProductHoverActions";
import CompareBar from "../CompareBar/CompareBar";
import sharedStyles from "../common/SharedStyles.module.css";

// Khai báo type Product (có thể tách ra file riêng)
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  hoverImage?: string; 
  rating: number;
}

const catFoodData = {
  dry: [
    {
      id: 1,
      name: "Hạt Cho Mèo Catsrang",
      price: 85000,
      oldPrice: 90000,
      discount: 6,
      image: "/src/assets/SanPham1.jpg",
      hoverImage: "/src/assets/SanPham.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Hạt Cho Mèo Snappy Tom",
      price: 70000,
      image: "/src/assets/SanPham1.jpg",
      hoverImage: "/src/assets/SanPham.jpg",
      rating: 4,
    },
  ],
  wet: [
    {
      id: 3,
      name: "Pate Mèo Nekko Jelly 70g",
      price: 15000,
      oldPrice: 20000,
      discount: 25,
      image: "/src/assets/SanPham1.jpg",
      hoverImage: "/src/assets/SanPham.jpg",
      rating: 5,
    },
    {
      id: 4,
      name: "Pate Mèo Snappy Tom Cá Ngừ",
      price: 14500,
      oldPrice: 17000,
      discount: 15,
      image: "/src/assets/SanPham1.jpg",
      hoverImage: "/src/assets/SanPham.jpg",
      rating: 5,
    },
  ],
  snack: [
    {
      id: 5,
      name: "Bánh Thưởng Cho Mèo Catnip Biscuits",
      price: 64000,
      image: "/src/assets/SanPham1.jpg",
      hoverImage: "/src/assets/SanPham.jpg",
      rating: 5,
    },
    // ...
  ],
};

const CatFoodSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dry" | "wet" | "snack">("dry");

  // State cho popup “xem nhanh”
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // State cho “so sánh”
  const [compareList, setCompareList] = useState<Product[]>([]);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  const handleRemoveItem = (id: number) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  // Thêm / gỡ sản phẩm trong compareList
  const handleCompare = (product: Product) => {
    setCompareList((prev) => {
      // Kiểm tra xem sản phẩm này đã có trong compareList chưa
      const isExist = prev.find((p) => p.id === product.id);
  
      // Nếu đã tồn tại => gỡ ra (remove)
      if (isExist) {
        return prev.filter((p) => p.id !== product.id);
      }
  
      // Nếu chưa tồn tại => chuẩn bị thêm mới
      // Nhưng trước khi thêm, kiểm tra có >= 3 chưa
      if (prev.length >= 3) {
        alert("Bạn chỉ có thể so sánh tối đa 3 sản phẩm. Vui lòng xóa bớt!");
        return prev; // Không thêm nữa
      }
  
      // Nếu chưa đủ 3 => thêm bình thường
      return [...prev, product];
    });
  };
  

  const renderProducts = (products: Product[]) => {
    return products.map((p) => (
      <div className={styles.productCard} key={p.id}>
        <div className={styles.imageContainer}>
          {/* Ảnh chính */}
          <img
            src={p.image}
            alt={p.name}
            className={`${styles.productImage} ${styles.defaultImage}`}
          />
          {/* Ảnh hover */}
          {p.hoverImage && (
            <img
              src={p.hoverImage}
              alt={p.name}
              className={`${styles.productImage} ${styles.hoverImage}`}
            />
          )}

          {/* Icons xem nhanh / so sánh */}
          <ProductHoverActions
            wrapperClass={styles.wrapperIcon} 
            onQuickView={() => handleQuickView(p)}
            onCompare={() => handleCompare(p)}
          />
        </div>

        <h3 className={styles.productName}>{p.name}</h3>
        <div className={styles.priceWrapper}>
          <span className={styles.price}>{p.price.toLocaleString()}đ</span>
          {p.oldPrice && (
            <span className={styles.oldPrice}>{p.oldPrice.toLocaleString()}đ</span>
          )}
          {p.discount && <span className={styles.discount}>-{p.discount}%</span>}
        </div>

        {/* Rating */}
        <div className={styles.rating}>
          {Array.from({ length: p.rating }).map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.catFoodSection}>
      <h2 className={sharedStyles.sectionTitle}>Dinh dưỡng cho mèo 🐾</h2>
      <div className={styles.tabButtons}>
        <button
          className={activeTab === "dry" ? styles.activeTab : ""}
          onClick={() => setActiveTab("dry")}
        >
          Thức ăn cho mèo
        </button>
        <button
          className={activeTab === "wet" ? styles.activeTab : ""}
          onClick={() => setActiveTab("wet")}
        >
          Thức ăn ướt
        </button>
        <button
          className={activeTab === "snack" ? styles.activeTab : ""}
          onClick={() => setActiveTab("snack")}
        >
          Snack cho mèo
        </button>
      </div>

      <div className={styles.productGrid}>
        {activeTab === "dry" && renderProducts(catFoodData.dry)}
        {activeTab === "wet" && renderProducts(catFoodData.wet)}
        {activeTab === "snack" && renderProducts(catFoodData.snack)}
      </div>

      {/* Modal “Xem nhanh” */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />

      {/* CompareBar */}
      <CompareBar
        compareList={compareList}
        onRemoveItem={handleRemoveItem}
        onClearAll={() => setCompareList([])}
        onCompareNow={() => alert("So sánh ngay!")}
      />
    </div>
  );
};

export default CatFoodSection;
