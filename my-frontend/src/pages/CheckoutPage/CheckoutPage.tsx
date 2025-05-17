import { useLocation, Link }   from "react-router-dom";
import { useState }            from "react";

import { useCartStore }        from "@/store/cartStore";
import { formatCurrency }      from "@/utils/formatCurrency";
import Breadcrumbs             from "@/components/Breadcrumbs/Breadcrumbs";

import styles                  from "./CheckoutPage.module.css";
import Header from "@layouts/Header/Header";
import Footer from "@layouts/Footer/Footer";

export default function CheckoutPage() {
  /* --- data từ CartPage truyền qua state (optional) --- */
  const { state } = useLocation() as { state?: { total: number } };
  const { cartItems } = useCartStore();

  /* --- form state thô (bạn có thể gắn yup / formik sau) --- */
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    pay: "cod",
    coupon: "",
  });

  const subTotal   = cartItems.reduce((n, i) => n + i.gia, 0);
  const grandTotal = state?.total ?? subTotal;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call API order
    alert("Đặt hàng thành công!");
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <Breadcrumbs />

      <div className={styles.content}>
        {/* ---------------- LEFT: form ---------------- */}
        <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.heading}>Thông tin giao hàng</h2>

          <input
            placeholder="Họ và tên"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            placeholder="Địa chỉ"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            required
          />

          <div className={styles.row}>
            <select
              value={form.province}
              onChange={e => setForm({ ...form, province: e.target.value })}
            >
              <option value="">Tỉnh / thành</option>
              <option>TP HCM</option>
              <option>Hà Nội</option>
              <option>Đà Nẵng</option>
            </select>

            <select
              value={form.district}
              onChange={e => setForm({ ...form, district: e.target.value })}
            >
              <option value="">Quận / huyện</option>
            </select>
          </div>

          <h3 className={styles.subHeading}>Phương thức thanh toán</h3>

          <label className={styles.radio}>
            <input
              type="radio"
              name="pay"
              checked={form.pay === "cod"}
              onChange={() => setForm({ ...form, pay: "cod" })}
            />
            Thanh toán khi giao hàng (COD)
          </label>

          <label className={styles.radio}>
            <input
              type="radio"
              name="pay"
              checked={form.pay === "bank"}
              onChange={() => setForm({ ...form, pay: "bank" })}
            />
            Chuyển khoản qua ngân hàng
          </label>

          <button className={styles.orderBtn} type="submit">
            Hoàn tất đơn hàng
          </button>

          <p className={styles.backLink}>
            <Link to="/">← Tiếp tục mua sắm</Link>
          </p>
        </form>

        {/* ---------------- RIGHT: summary ---------------- */}
        <aside className={styles.summary}>
          {cartItems.map(it => (
            <div key={it.id} className={styles.item}>
              <div className={styles.left}>
                <img src={it.thumb || "/src/assets/img-placeholder.png"} />
                <span className={styles.qty}>× {it.so_luong}</span>
              </div>
              <span className={styles.title}>{it.ten_san_pham}</span>
              <b>{formatCurrency(it.gia)}</b>
            </div>
          ))}

          <input
            className={styles.coupon}
            placeholder="Mã giảm giá"
            value={form.coupon}
            onChange={e => setForm({ ...form, coupon: e.target.value })}
          />
          {/* nút áp dụng: chỉ hiển thị, chưa handle */}
          <button type="button" className={styles.apply}>Áp dụng</button>

          <div className={styles.totalRow}>
            <span>Tổng cộng</span>
            <strong>{formatCurrency(grandTotal)}</strong>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
