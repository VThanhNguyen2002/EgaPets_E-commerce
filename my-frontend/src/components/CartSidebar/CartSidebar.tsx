// src/components/CartSidebar/CartSidebar.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './CartSidebar.module.css';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';

const CartSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cartItems, removeFromCart, clearCart } = useCartStore();
  const navigate = useNavigate();

  if (typeof window === 'undefined') return null;

  return ReactDOM.createPortal(
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.sidebar}>
        <div className={styles.header}>
          <h3>Giỏ hàng</h3>
          <button onClick={onClose}>×</button>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <img src="/src/assets/empty-cart.jpg" alt="empty" />
            <p>Giỏ hàng chưa có gì!</p>
          </div>
        ) : (
          <div className={styles.cartContent}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.item}>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>{item.price.toLocaleString()}₫ × {item.quantity}</p>
                </div>
                <button onClick={() => removeFromCart(item.id)}>🗑</button>
              </div>
            ))}
            <div className={styles.footer}>
              <button className={styles.clearBtn} onClick={clearCart}>Xóa tất cả</button>
              <button className={styles.checkoutBtn} onClick={() => {
                onClose();
                navigate("/cart");
              }}>Xem giỏ hàng</button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default CartSidebar;
