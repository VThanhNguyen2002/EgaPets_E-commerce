import React, { useState } from "react";
import styles from "./CatFoodSection.module.css";

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  rating: number;
}

// Data ảo cho 3 tab: "Thức ăn cho mèo", "Thức ăn ướt", "Snack cho mèo"
const catFoodData = {
  dry: [
    {
      id: 1,
      name: "Hạt Cho Mèo Catsrang",
      price: 85000,
      oldPrice: 90000,
      discount: 6,
      image: "/src/assets/cat1.jpg", // Bạn thay bằng ảnh thật trong folder assets
      rating: 5,
    },
    {
      id: 2,
      name: "Hạt Cho Mèo Snappy Tom",
      price: 70000,
      image: "/src/assets/cat2.jpg",
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
      image: "/src/assets/cat3.jpg",
      rating: 5,
    },
    {
      id: 4,
      name: "Pate Mèo Snappy Tom Cá Ngừ",
      price: 14500,
      oldPrice: 17000,
      discount: 15,
      image: "/src/assets/cat4.jpg",
      rating: 5,
    },
  ],
  snack: [
    {
      id: 5,
      name: "Bánh Thưởng Cho Mèo Catnip Biscuits",
      price: 64000,
      image: "/src/assets/cat5.jpg",
      rating: 5,
    },
    {
      id: 6,
      name: "Cỏ Mèo Bạc Hà Catnip Cho Mèo",
      price: 50000,
      oldPrice: 60000,
      discount: 17,
      image: "/src/assets/cat6.jpg",
      rating: 5,
    },
    {
        id: 7,
        name: "Cỏ Mèo Bạc Hà Catnip Cho Mèo",
        price: 50000,
        oldPrice: 60000,
        discount: 17,
        image: "/src/assets/cat6.jpg",
        rating: 5,
    },
    {
        id: 7,
        name: "Cỏ Mèo Bạc Hà Catnip Cho Mèo",
        price: 50000,
        oldPrice: 60000,
        discount: 17,
        image: "/src/assets/cat6.jpg",
        rating: 5,
    },
    {
        id: 7,
        name: "Cỏ Mèo Bạc Hà Catnip Cho Mèo",
        price: 50000,
        oldPrice: 60000,
        discount: 17,
        image: "/src/assets/cat6.jpg",
        rating: 5,
    },
    {
        id: 7,
        name: "Cỏ Mèo Bạc Hà Catnip Cho Mèo",
        price: 50000,
        oldPrice: 60000,
        discount: 17,
        image: "/src/assets/cat6.jpg",
        rating: 5,
    },
    
  ],
};

const CatFoodSection: React.FC = () => {
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
    <div className={styles.catFoodSection}>
      <h2 className={styles.sectionTitle}>Dinh dưỡng cho mèo 🐾</h2>
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
    </div>
  );
};

export default CatFoodSection;
