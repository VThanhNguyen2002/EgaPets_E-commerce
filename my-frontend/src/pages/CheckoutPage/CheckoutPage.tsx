// src/pages/CheckoutPage/CheckoutPage.tsx
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { useCartStore } from '../../store/cartStore';
import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
  const { cartItems } = useCartStore();

  return (
    <div className={styles.container}>
      <Breadcrumbs items={[{ label: 'Trang chủ', path: '/' }, { label: 'Thanh toán' }]} />
      <h2>Thông tin giao hàng</h2>

      <form className={styles.form}>
        <input type="text" placeholder="Họ và tên" required />
        <input type="email" placeholder="Email" required />
        <input type="text" placeholder="Số điện thoại" required />
        <input type="text" placeholder="Địa chỉ" required />

        <select><option>Chọn tỉnh / thành</option></select>
        <select><option>Chọn quận / huyện</option></select>

        <h3>Phương thức thanh toán</h3>
        <label><input type="radio" name="pay" /> Thanh toán khi nhận hàng</label>
        <label><input type="radio" name="pay" /> Chuyển khoản</label>

        <button type="submit">Hoàn tất đơn hàng</button>
      </form>

      <div className={styles.summary}>
        <h3>Tóm tắt đơn hàng</h3>
        {cartItems.map(item => (
          <div key={item.id} className={styles.item}>
            <p>{item.name}</p>
            <p>{item.price.toLocaleString()}₫ × {item.quantity}</p>
          </div>
        ))}
        <strong>
          Tổng cộng: {cartItems.reduce((total, i) => total + i.price * i.quantity, 0).toLocaleString()}₫
        </strong>
      </div>
    </div>
  );
};

export default CheckoutPage;
