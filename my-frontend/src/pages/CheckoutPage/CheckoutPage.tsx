import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { formatCurrency } from "@/utils/formatCurrency";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import useProvinces from "@/hooks/useProvinces";
import usePaymentMethods from "@/hooks/usePaymentMethods";
import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  const { state } = useLocation() as { state?: { total: number } };
  const { cartItems } = useCartStore();

  const { provinces } = useProvinces();
  const { data: paymentMethods } = usePaymentMethods();

  const [districts, setDistricts] = useState<{ code: number; name: string }[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    province: "",
    district: "",
    pay: "",
    coupon: "",
  });

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = provinces.find(p => p.code === +e.target.value);
    if (!selected) return;
    setForm({ ...form, province: selected.name, district: "" });
    setDistricts(selected.districts);
  };

  const subTotal = cartItems.reduce((n, i) => n + i.gia, 0);
  const grandTotal = state?.total ?? subTotal;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Đặt hàng thành công!");
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      province: "",
      district: "",
      pay: "",
      coupon: "",
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.pageTitle}>EGA Pets</div>
      <Breadcrumbs />

      <div className={styles.content}>
        <form className={styles.form} onSubmit={submit}>
          <h2 className={styles.heading}>Thông tin giao hàng</h2>

          <input placeholder="Họ và tên" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <input placeholder="Số điện thoại" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
          <input placeholder="Địa chỉ" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} required />

          <div className={styles.row}>
            <select value={form.province} onChange={handleProvinceChange} required>
              <option value="">Tỉnh / thành</option>
              {provinces.map(p => (
                <option key={p.code} value={p.code}>{p.name}</option>
              ))}
            </select>

            <select value={form.district} onChange={e => setForm({ ...form, district: e.target.value })} required>
              <option value="">Quận / huyện</option>
              {districts.map(d => (
                <option key={d.code} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <h3 className={styles.subHeading}>Phương thức thanh toán</h3>
          <div className={styles.paymentMethod}>
            {paymentMethods.map(method => (
              <label key={method.id}>
                <input
                  type="radio"
                  name="pay"
                  checked={form.pay === method.id}
                  onChange={() => setForm({ ...form, pay: String(method.id) })}
                />
                {method.ten_phuong_thuc}
              </label>
            ))}
          </div>

          <button type="submit" className={styles.orderBtn}>Hoàn tất đơn hàng</button>
          <p className={styles.backLink}><Link to="/cart">← Quay về giỏ hàng</Link></p>
        </form>

        <aside className={styles.summary}>
          {cartItems.map(it => (
            <div key={it.id} className={styles.item}>
              <div className={styles.left}>
                <img src={it.thumb || "/src/assets/img-placeholder.png"} alt="thumb" />
                <span className={styles.qty}>× {it.so_luong}</span>
              </div>
              <span className={styles.title}>{it.ten_san_pham}</span>
              <b>{formatCurrency(it.gia)}</b>
            </div>
          ))}

          <div className={styles.couponRow}>
            <input
              className={styles.coupon}
              placeholder="Mã giảm giá"
              value={form.coupon}
              onChange={e => setForm({ ...form, coupon: e.target.value })}
            />
            <button type="button" className={styles.apply}>Áp dụng</button>
          </div>

          <div className={styles.totalRow}>
            <span>Tổng cộng</span>
            <strong>{formatCurrency(grandTotal)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
