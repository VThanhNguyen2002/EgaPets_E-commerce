// src/pages/CartPage/CartPage.tsx
import { useCartStore } from '../../store/cartStore';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import styles from './CartPage.module.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Breadcrumbs items={[{ label: 'Trang chủ', path: '/' }, { label: 'Giỏ hàng' }]} />

      <h2>Giỏ hàng</h2>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn đang trống.</p>
      ) : (
        <div className={styles.cartList}>
          {cartItems.map(item => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.name} />
              <div className={styles.info}>
                <p>{item.name}</p>
                <p>{item.price.toLocaleString()}₫ × {item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>🗑</button>
            </div>
          ))}
          <div className={styles.actions}>
            <button onClick={() => navigate('/checkout')}>Thanh toán</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
