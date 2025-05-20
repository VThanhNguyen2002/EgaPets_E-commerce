import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Wallet, Banknote, CreditCard, CheckCircle } from "lucide-react";

import { useCartStore }  from "@/store/cartStore";
import { useAuthStore }  from "@/store/authStore";
import useProvinces      from "@/hooks/useProvinces";
import usePaymentMethods from "@/hooks/usePaymentMethods";
import useCheckout       from "@/hooks/useCheckout";
import { formatCurrency } from "@/utils/formatCurrency";
import PromoInput        from "@/components/PromoInput";
import Breadcrumbs       from "@/components/Breadcrumbs/Breadcrumbs";

import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
  const { state }  = useLocation() as { state?: { total: number } };
  const { cartItems, clearLocal } = useCartStore();
  const { khachHangId } = useAuthStore();

  /* ───────────────── UI state ───────────────── */
  const [form, setForm] = useState({
    name:"", email:"", phone:"", address:"",
    province:"", district:"", pay:"", coupon:""
  });
  const [provinceCode, setProvinceCode] = useState<number>();
  const [districts, setDistricts] = useState<{code:number;name:string}[]>([]);
  const [promoApplied, setPromoApplied] = useState(false);

  /* ─────────────── data hooks ─────────────── */
  const { provinces }         = useProvinces();
  const { data:methods }      = usePaymentMethods();
  const { step, qr, msg, submit, markPaid } = useCheckout();

  /* ─────────────── price calc ─────────────── */
  const subTotal   = cartItems.reduce((n,i)=>n+i.gia,0);
  const grandTotal = state?.total ?? subTotal;
  const discount   = promoApplied ? grandTotal*0.5 : 0;
  const totalPay   = grandTotal - discount;

  /* ─────────────── handlers ─────────────── */
  async function handleSubmit(e:React.FormEvent){
    e.preventDefault();
    if(step!=="form") return;

    await submit({
      customerId: khachHangId ?? null,
      guestInfo : { hoTen: form.name, phone: form.phone, email: form.email },
      items     : cartItems.map(i => ({
        id: i.san_pham_id, qty: i.so_luong,
        price: i.don_gia,  discount: i.giam_gia ?? 0
      })),
      discount  : promoApplied ? 50 : 0,
      payMethod : Number(form.pay),
      payMethodLabel: methods.find(m => String(m.id) === form.pay)!.ten_phuong_thuc
    });


    clearLocal();            // dọn giỏ sau khi submit
  }

  function handleProvince(e:React.ChangeEvent<HTMLSelectElement>){
    const code = +e.target.value;
    setProvinceCode(code);
    const p = provinces.find(p=>p.code===code);
    setDistricts(p? p.districts : []);
    setForm({...form, province:p?.name||"", district:""});
  }

  /* ─────────────── hỗ trợ render ─────────────── */
  const icon = (lbl:string)=> lbl.toLowerCase().includes("momo")
      ? <Wallet size={26} color="#a50064"/>
      : lbl.toLowerCase().includes("ngân")
        ? <Banknote size={26} color="#31b057"/>
        : <CreditCard size={26} color="#ffa502"/>;

  /* ------------------------------------------------------------------ */
  return (
    <div className={styles.wrapper}>
      <div className={styles.pageTitle}>EGA Pets</div>
      <Breadcrumbs/>

      {/* ------------------------ FORM / WAIT / DONE ------------------- */}
      {step==="form" && (
      <div className={styles.content}>
        {/* ======================== FORM ======================== */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Thông tin KH */}
          <h2 className={styles.heading}>Thông tin giao hàng</h2>
          <div className={styles.customerFields}>
            <input placeholder="Họ và tên" value={form.name}
                   onChange={e=>setForm({...form,name:e.target.value})} required/>
            <input placeholder="Email" type="email" value={form.email}
                   onChange={e=>setForm({...form,email:e.target.value})} required/>
            <input placeholder="Số điện thoại" value={form.phone}
                   onChange={e=>setForm({...form,phone:e.target.value})} required/>
            <input placeholder="Địa chỉ" value={form.address}
                   onChange={e=>setForm({...form,address:e.target.value})} required/>
            <div className={styles.selectRow}>
              <select value={provinceCode??""} onChange={handleProvince} required>
                <option value="">Tỉnh / thành</option>
                {provinces.map(p=>
                  <option key={p.code} value={p.code}>{p.name}</option>)}
              </select>
              <select value={form.district}
                      onChange={e=>setForm({...form,district:e.target.value})}
                      required>
                <option value="">Quận / huyện</option>
                {districts.map(d=>
                  <option key={d.code} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>

          {/* Phương thức */}
          <h3 className={styles.subHeading}>Phương thức thanh toán</h3>
          <div className={styles.paymentMethod}>
            {methods.map(pm => {
              const idStr = String(pm.id); // 👈 ép kiểu thành chuỗi
              return (
                <label key={pm.id} className={styles.paymentOption}>
                  <input
                    type="radio"
                    name="pay"
                    value={idStr}
                    checked={form.pay === idStr}
                    onChange={() => setForm({ ...form, pay: idStr })}
                  />
                  {icon(pm.ten_phuong_thuc)}
                  <span>{pm.ten_phuong_thuc}</span>
                </label>
              );
            })}

          </div>

          {/* Submit */}
          <button className={styles.orderBtn}>Hoàn tất đơn hàng</button>
          <p className={styles.backLink}><Link to="/cart">← Quay về giỏ hàng</Link></p>
        </form>

        {/* ===================== TÓM TẮT GIỎ HÀNG ===================== */}
        <aside className={styles.summary}>
          {cartItems.map(it=>(
            <div key={it.id} className={styles.item}>
              <div className={styles.left}>
                <img src={it.thumb || "/src/assets/img-placeholder.png"} alt={it.ten_san_pham}/>
                <span className={styles.qty}>× {it.so_luong}</span>
              </div>
              <div className={styles.info}>
                <span className={styles.title}>{it.ten_san_pham}</span>
              </div>
              <div className={styles.price}>
                <b>{formatCurrency(it.gia)}</b>
              </div>
            </div>
          ))}

          <PromoInput
            enabled={cartItems.length>0}
            cartCount={cartItems.length}
            subTotal={grandTotal}
            applied={promoApplied}
            onApply={()=>setPromoApplied(true)}
          />

          <div className={styles.totalRow}>
            <span>Tổng cộng</span>
            <strong>{formatCurrency(totalPay)}</strong>
          </div>
        </aside>
      </div>
      )}

      {/* ------------------------ CHỜ THANH TOÁN ----------------------- */}
      {step==="waiting" && (
        <div className={styles.waiting}>
          <h2>Đang chờ bạn thanh toán MoMo…</h2>
          {qr && <img src={qr} className={styles.qr}/>}
          <button
            onClick={() => markPaid("Bạn đã xác nhận đã thanh toán")}
            className={styles.doneBtn}
          >
            Tôi đã thanh toán
          </button>
        </div>
      )}

      {/* ------------------------ ĐÃ XONG ------------------------------ */}
      {step==="done" && (
        <div className={styles.done}>
          <CheckCircle size={72} color="#31b057"/>
          <h2>{msg || "Đặt hàng thành công!"}</h2>
          <Link to="/" className={styles.homeLink}>← Về trang chủ</Link>
        </div>
      )}
    </div>
  );
}
