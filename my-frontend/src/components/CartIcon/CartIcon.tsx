// 📁 src/components/CartIcon/CartIcon.tsx
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import styles from "./CartIcon.module.css";

interface Props {
  onClick?: () => void;
}

export default function CartIcon({ onClick }: Props) {
  const count = useCartStore((s) => s.getCount());

  return (
    <div className={styles.cartIcon} onClick={onClick}>
      {count > 0 && <span className={styles.badge}>{count}</span>}
      <ShoppingCart size={24} />
      <span className={styles.label}>Giỏ hàng</span>
    </div>
  );
}
