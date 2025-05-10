// 📁 src/components/CartSidebar/CartSidebar.tsx
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import { getUserFriendlyError } from "../../utils/errorHandler";
import { toast } from "react-toastify";

import styles from "./CartSidebar.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose(): void;
}

export default function CartSidebar({ isOpen, onClose }: Props) {
  const { cartItems, refresh, remove } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
  
    (async () => {
      try {
        await refresh();
      } catch (e) {
        toast.error(getUserFriendlyError(e));
      }
    })();
  }, [isOpen]);
  

  if (typeof window === "undefined") return null;

  const total = cartItems.reduce((s, i) => s + i.gia, 0);

  return ReactDOM.createPortal(
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h3>Giỏ hàng</h3>
          <button onClick={onClose}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <img src="/src/assets/empty-cart.jpg" />
            <p>Giỏ hàng chưa có gì!</p>
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {cartItems.map((it) => (
                <div key={it.id} className={styles.item}>
                  <img src={it.thumb || "/src/assets/placeholder/product.png"} />
                  <div>
                    <p>{it.ten_san_pham}</p>
                    <p>{it.gia.toLocaleString()}₫</p>
                  </div>
                  <button onClick={() => remove(it.id)}>×</button>
                </div>
              ))}
            </div>

            <div className={styles.total}>
              <span>Tổng cộng</span>
              <span>{total.toLocaleString()}₫</span>
            </div>

            <div className={styles.actions}>
              <button onClick={() => navigate("/cart")}>Xem giỏ hàng</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
