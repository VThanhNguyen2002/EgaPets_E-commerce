import React, { useState } from "react";
import styles from "./DogFoodSection.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  rating: number;
}

// Data ảo cho 3 tab: "Thức ăn cho chó", "Thức ăn ướt", "Snack cho chó"
const dogFoodData = {
  dry: [
    {
      id: 1,
      name: "Hạt Cho Chó SmartHeart",
      price: 120000,
      oldPrice: 150000,
      discount: 20,
      image: "/src/assets/dog1.jpg",
      rating: 5,
    },
    {
      id: 2,
      name: "Hạt Cho Chó Pedigree",
      price: 85000,
      image: "/src/assets/dog2.jpg",
      rating: 4,
    },
  ],
  wet: [
    {
      id: 3,
      name: "Pate Cho Chó Gan Bò",
      price: 30000,
      oldPrice: 35000,
      discount: 14,
      image: "/src/assets/dog3.jpg",
      rating: 5,
    },
    {
      id: 4,
      name: "Pate Cho Chó Blisk Gà Rau Củ",
      price: 40000,
      image: "/src/assets/dog4.jpg",
      rating: 4,
    },
  ],
  snack: [
    {
      id: 5,
      name: "Snack Xương Gặm Cho Chó",
      price: 20000,
      image: "/src/assets/dog5.jpg",
      rating: 5,
    },
    {
      id: 6,
      name: "Xúc Xích Thưởng Cho Chó",
      price: 25000,
      oldPrice: 30000,
      discount: 17,
      image: "/src/assets/dog6.jpg",
      rating: 5,
    },
  ],
};

const DogFoodSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"dry" | "wet" | "snack">("dry");

  const renderProducts = (products: Product[]) => {
    return products.map((p) => (
      <div className={styles.productCard} key={p.id}>
        <img src={p.image} alt={p.name} className={styles.productImage} />
        <h3 className={styles.productName}>{p.name}</h3>
        <div className={styles.priceWrapper}>
          <span className={styles.price}>{p.price.toLocaleString()}đ</span>
          {p.oldPrice && (
            <span className={styles.oldPrice}>{p.oldPrice.toLocaleString()}đ</span>
          )}
          {p.discount && <span className={styles.discount}>-{p.discount}%</span>}
        </div>
        <div className={styles.rating}>
          {Array.from({ length: p.rating }).map((_, i) => (
            <span key={i}>⭐</span>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className={styles.dogFoodSection}>
      <h2 className={styles.sectionTitle}>Dinh dưỡng cho chó 🐶</h2>
      <div className={styles.tabButtons}>
        <button
          className={activeTab === "dry" ? styles.activeTab : ""}
          onClick={() => setActiveTab("dry")}
        >
          Thức ăn cho chó
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
          Snack cho chó
        </button>
      </div>

      <div className={styles.productGrid}>
        {activeTab === "dry" && renderProducts(dogFoodData.dry)}
        {activeTab === "wet" && renderProducts(dogFoodData.wet)}
        {activeTab === "snack" && renderProducts(dogFoodData.snack)}
      </div>
    </div>
  );
};

export default DogFoodSection;
