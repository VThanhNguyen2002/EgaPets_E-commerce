import styles from "./SideCategory.module.css";
import { FaTimes } from "react-icons/fa";

interface Props {
  onClose: () => void;
}

const SideCategory = ({ onClose }: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.sideMenu}>
        <button className={styles.closeBtn} onClick={onClose}>
          <FaTimes />
        </button>
        <h2>Danh mục sản phẩm</h2>
        <ul className={styles.catList}>
          <li>Thức ăn cho mèo</li>
          <li>Đồ chơi</li>
          <li>Giường - Nệm</li>
          <li>Phụ kiện</li>
        </ul>
      </div>
    </div>
  );
};

export default SideCategory;
