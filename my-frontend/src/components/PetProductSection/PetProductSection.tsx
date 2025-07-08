import React from "react";
import styles from "./PetProductSection.module.css";
import sharedStyles from "../common/SharedStyles.module.css";

// Data giả cho các loại sản phẩm thú cưng
import ThucAnChoBoss from "../../assets/ThucAnChoBoss.jpg";
import DoDungTiaLong from "../../assets/DoDungTiaLong.jpg";
import NhaVeSinh from "../../assets/NhaVeSinh.jpg";
import PhuKien from "../../assets/PhuKien.jpg";
import DemGiuong from "../../assets/DemGiuong.jpg";
import DungCuChaiLong from "../../assets/DungCuChaiLong.jpg";

const categories = [
  {
    id: 1,
    name: "Thức ăn cho Boss",
    image: ThucAnChoBoss,
  },
  {
    id: 2,
    name: "Đồ dùng tỉa lông",
    image: DoDungTiaLong,
  },
  {
    id: 3,
    name: "Nhà vệ sinh",
    image: NhaVeSinh,
  },
  {
    id: 4,
    name: "Phụ kiện",
    image: PhuKien,
  },
  {
    id: 5,
    name: "Đệm giường",
    image: DemGiuong,
  },
  {
    id: 6,
    name: "Dụng cụ chải lông",
    image: DungCuChaiLong,
  },
];

const PetProductSection: React.FC = () => {
  return (
    <div className={styles.petProductSection}>
      <h2 className={sharedStyles.sectionTitle}>Sản phẩm cho thú cưng 🐾</h2>
      <div className={styles.circleContainer}>
        {categories.map((item) => (
          <div key={item.id} className={styles.circleItem}>
            <img src={item.image} alt={item.name} className={styles.circleImage} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PetProductSection;
