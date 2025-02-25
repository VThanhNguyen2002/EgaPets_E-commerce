import styles from "./CartIcon.module.css";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = () => {
  const cartItemCount = 0; // Lấy từ store khi có dữ liệu

  return (
    <div className={styles.cartContainer}>
      <div className={styles.iconWrapper}>
        <FaShoppingCart className={styles.cartIcon} />
        <span className={styles.itemCount}>{cartItemCount}</span>
      </div>
      <span className={styles.cartLabel}>Giỏ hàng</span>
    </div>
  );
};

export default CartIcon;
