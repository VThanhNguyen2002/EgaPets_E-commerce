// src/components/CartIcon/CartIcon.tsx
import styles from "./CartIcon.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../../store/cartStore";

interface Props {
  onClick?: () => void;
}

const CartIcon = ({ onClick }: Props) => {
  const cartItemCount = useCartStore((state) =>
    state.cartItems.reduce((sum, i) => sum + i.quantity, 0)
  );

  return (
    <div className={styles.cartContainer} onClick={onClick}>
      <div className={styles.iconWrapper}>
        <FaShoppingCart className={styles.cartIcon} />
        <span className={styles.itemCount}>{cartItemCount}</span>
      </div>
      <span className={styles.cartLabel}>Giỏ hàng</span>
    </div>
  );
};

export default CartIcon;
