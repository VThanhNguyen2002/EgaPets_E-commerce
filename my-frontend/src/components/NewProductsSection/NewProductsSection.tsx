import React, { useState } from "react";
import ProductHoverActions from "../ProductHoverActions/ProductHoverActions";
import CompareBar from "../CompareBar/CompareBar";
import QuickViewModal from "../QuickViewModal/QuickViewModal";

import styles from "./NewProductsSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";

// Kiểu dữ liệu cho sản phẩm
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

// Mock data “Sản phẩm mới”
const newProductsMock: Product[] = [
  {
    id: 101,
    name: "Bàn Cào Móng Giấy Cho Mèo",
    price: 90000,
    oldPrice: 120000,
    discount: 25,
    image: "/src/assets/SanPham.jpg",
    hoverImage: "/src/assets/SanPham1.jpg",
    rating: 5
  },
  {
    id: 102,
    name: "Bánh Thưởng Cho Mèo Catnip Biscuits",
    price: 64000,
    image: "/src/assets/SanPham1.jpg",
    hoverImage: "/src/assets/SanPham1.jpg",
    rating: 5
  },
  {
    id: 103,
    name: "Bánh Thưởng Cho Mèo GimCat Nutri Pockets",
    price: 148000,
    image: "/src/assets/SanPham.jpg",
    hoverImage: "/src/assets/SanPham1.jpg",
    rating: 5
  },
  {
    id: 104,
    name: "Cần Câu Mèo Đính Chuông Lông Vũ",
    price: 60000,
    image: "/src/assets/SanPham1.jpg",
    hoverImage: "/src/assets/SanPham1.jpg",
    rating: 5
  },
  {
    id: 105,
    name: "Cây Lăn Mát Xa Cho Mèo Thư Giãn",
    price: 110000,
    oldPrice: 130000,
    discount: 15,
    image: "/src/assets/SanPham.jpg",
    hoverImage: "/src/assets/SanPham1.jpg",
    rating: 5
  },
  {
    id: 106,
    name: "Cỏ Mèo Bạc Hà Catnip Cho Mèo",
    price: 50000,
    oldPrice: 60000,
    discount: 17,
    image: "/src/assets/SanPham1.jpg",
    hoverImage: "/src/assets/SanPham1.jpg",
    rating: 5
  },
];

const NewProductsSection: React.FC = () => {
  // State cho popup xem nhanh
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // State cho so sánh
  const [compareList, setCompareList] = useState<Product[]>([]);

  // Mở popup
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Đóng popup
  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setSelectedProduct(null);
  };

  // Thêm / gỡ sản phẩm khỏi compareList
  const handleCompare = (product: Product) => {
    setCompareList((prev) => {
      const isExist = prev.find((p) => p.id === product.id);
      if (isExist) {
        // Nếu đã có => xóa
        return prev.filter((p) => p.id !== product.id);
      }
      // Nếu chưa có => thêm, nhưng kiểm tra >=3 thì cảnh báo
      if (prev.length >= 3) {
        alert("Bạn chỉ có thể so sánh tối đa 3 sản phẩm. Vui lòng xóa bớt!");
        return prev;
      }
      return [...prev, product];
    });
  };

  // Xóa 1 item khỏi CompareBar
  const handleRemoveItem = (id: number) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  // Render 1 product card
  const renderCard = (item: Product) => {
    return (
      <div key={item.id} className={styles.productCard}>
        <div className={styles.imageContainer}>
          <img src={item.image} alt={item.name} className={styles.productImage} />

          {/* Hover icons */}
          <ProductHoverActions
            wrapperClass={styles.wrapperIcon}
            onQuickView={() => handleQuickView(item)}
            onCompare={() => handleCompare(item)}
          />
        </div>

        <h3 className={styles.productName}>{item.name}</h3>

        <div className={styles.priceWrapper}>
          <span className={styles.price}>{item.price.toLocaleString()}đ</span>
          {item.oldPrice && (
            <span className={styles.oldPrice}>
              {item.oldPrice.toLocaleString()}đ
            </span>
          )}
          {item.discount && (
            <span className={styles.discount}>-{item.discount}%</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.newProductsSection}>
      <h2 className={sharedStyles.sectionTitle}>Sản phẩm mới</h2>

      {/* Banner trái + Grid sản phẩm phải */}
      <div className={styles.sectionContent}>
        <div className={styles.leftBanner}>
          <img
            src="/src/assets/IntroSanPhamMoi.jpg"
            alt="Banner Sản phẩm mới"
            className={styles.bannerImage}
          />
        </div>

        <div className={styles.rightContent}>
          <div className={styles.productsWrapper}>
            <div className={styles.productsGrid}>
              {newProductsMock.map((item) => renderCard(item))}
            </div>
            <div className={styles.viewAllWrapper}>
              <button className={styles.viewAllButton}>Xem tất cả &raquo;</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Xem nhanh */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />

      {/* Compare Bar */}
      <CompareBar
        compareList={compareList}
        onRemoveItem={handleRemoveItem}
        onClearAll={() => setCompareList([])}
        onCompareNow={() => alert("So sánh ngay!")}
      />
    </div>
  );
};

export default NewProductsSection;
