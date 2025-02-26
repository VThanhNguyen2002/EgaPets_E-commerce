import React from "react";
import styles from "./PetProductSection.module.css";

// Data giả cho các loại sản phẩm thú cưng
const petProducts = [
  {
    id: 1,
    title: "Thức ăn cho boss",
    image: "/src/assets/ThucAnChoBoss.jpg",
  },
  {
    id: 2,
    title: "Đồ dùng tỉa lông",
    image: "/src/assets/DoDungTiaLong.jpg",
  },
  {
    id: 3,
    title: "Nhà vệ sinh",
    image: "/src/assets/NhaVeSinh.jpg",
  },
  {
    id: 4,
    title: "Phụ kiện",
    image: "/src/assets/PhuKien.jpg",
  },
  {
    id: 5,
    title: "Đệm - Giường",
    image: "/src/assets/DemGiuong.jpg",
  },
  {
    id: 6,
    title: "Dụng cụ chải lông",
    image: "/src/assets/DungCuChaiLong.jpg",
  },
];

const PetProductSection: React.FC = () => {
  return (
    <div className={styles.petProductSection}>
      <h2 className={styles.sectionTitle}>Sản phẩm cho thú cưng 🐾</h2>
      <div className={styles.circleContainer}>
        {petProducts.map((item) => (
          <div key={item.id} className={styles.circleItem}>
            <img src={item.image} alt={item.title} className={styles.circleImage} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetProductSection;
