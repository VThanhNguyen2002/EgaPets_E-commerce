import { useState } from "react";
import styles from "./CategoryDropdown.module.css";

const categories = ["Thức ăn cho mèo", "Đồ chơi cho mèo", "Giường - Nệm cho mèo"];

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.dropdownButton}>
        Danh mục sản phẩm
      </button>
      {isOpen && (
        <ul className={styles.dropdownMenu}>
          {categories.map((category) => (
            <li key={category} className={styles.dropdownItem}>
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
