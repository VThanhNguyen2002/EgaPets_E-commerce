// src/components/CartSidebar/CartSidebar.tsx
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingCart, X, Minus, Plus, LogIn, Package } from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import useProducts from "@/hooks/useProducts";
import ProductCardMini from "@/components/ProductCardMini/ProductCardMini";
import { formatCurrency } from "@/utils/formatCurrency";

import styles from "./CartSidebar.module.css";

const PROMO = "EGA50";
const RATE = 0.5;

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose(): void }) {
  const { cartItems, refresh, remove, updateQty, add, optimisticAdd } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const nav = useNavigate();

  const [code, setCode] = useState("");
  const [ok, setOk] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      refresh();
      setCode("");
      setOk(false);
      setClosing(false);
    }
  }, [isOpen]);

  const hasCat = cartItems.some(i => i.loai === "cat");
  const hasDog = cartItems.some(i => i.loai === "dog");
  const { products } = useProducts(hasCat ? "cat" : hasDog ? "dog" : "");
  const suggest = products.filter(p => !cartItems.find(c => c.san_pham_id === p.id)).slice(0, 8);

  const sub = cartItems.reduce((n, i) => n + i.gia, 0);
  const canApply = code.trim().toUpperCase() === PROMO && cartItems.length >= 2;
  const disc = ok ? sub * RATE : 0;
  const grand = sub - disc;

  const applyPromo = () => {
    if (code.trim().toUpperCase() !== PROMO)
      return toast.error("Mã không hợp lệ!");
    if (cartItems.length < 2)
      return toast.info("Cần ít nhất 2 sản phẩm để áp dụng EGA50");
    setOk(true);
    toast.success("Đã áp dụng mã giảm giá!");
  };

  const goCheckout = () => {
    if (!isLoggedIn) {
      toast.info("Hãy đăng nhập trước khi thanh toán");
      nav("/login");
      return;
    }
    nav("/checkout");
  };

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 300);
  };

  if (typeof window === "undefined") return null;

  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : ""} ${closing ? styles.closing : ""}`}
      onClick={handleClose}
    >
      {suggest.length > 0 && (
        <aside className={styles.suggest} onClick={e => e.stopPropagation()}>
          <h3>Sản phẩm gợi ý</h3>
          <div className={styles.grid}>
            {suggest.map(p => (
              <ProductCardMini
                key={p.id}
                p={p}
                onClick={() => nav(`/product/${p.id}`)}
                onAdd={async () => {
                  optimisticAdd(p);
                  await add({ productId: p.id, quantity: 1 });
                  refresh();
                }}
              />
            ))}
          </div>
        </aside>
      )}

      <aside className={styles.sidebar} onClick={e => e.stopPropagation()}>
        <header className={styles.header}>
          <ShoppingCart size={22} /> Giỏ hàng
          <button onClick={handleClose}>
            <X size={22} />
          </button>
        </header>

        {cartItems.length === 0 ? (
          <div className={styles.empty}>
            <img src="/src/assets/empty-cart.jpg" />
            <p>Giỏ hàng trống</p>
          </div>
        ) : (
          <>
            <div className={styles.wrapper}>
              <ul className={styles.list}>
                {cartItems.map(it => (
                  <li key={it.id} className={styles.item}>
                    <img src={it.thumb || "/src/assets/img-placeholder.png"} />
                    <div className={styles.info}>
                      <span className={styles.name}>{it.ten_san_pham}</span>
                      {it.ma_sp && <i className={styles.sku}>#{it.ma_sp}</i>}
                      <span className={styles.unit}>{formatCurrency(it.don_gia)}</span>
                    </div>

                    <div className={styles.qtyBox}>
                      <button disabled={it.so_luong <= 1} onClick={() => updateQty(it.id, it.so_luong - 1)}>
                        <Minus size={14} />
                      </button>
                      <span>{it.so_luong}</span>
                      <button onClick={() => updateQty(it.id, it.so_luong + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>

                    <span className={styles.line}>{formatCurrency(it.gia)}</span>
                    <button className={styles.del} onClick={() => remove(it.id)}>
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className={styles.promoBox}>
                <input
                  placeholder="Mã giảm giá"
                  value={code}
                  disabled={ok}
                  onChange={e => {
                    setOk(false);
                    setCode(e.target.value);
                  }}
                />
                <button onClick={applyPromo}>Áp dụng</button>
              </div>
              {ok && <p className={styles.promoMsg}>✔ Giảm {formatCurrency(disc)}</p>}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Tổng cộng</span>
                <b>{formatCurrency(grand)}</b>
              </div>

              <button className={styles.pay} onClick={goCheckout}>
                {isLoggedIn ? <Package size={18} /> : <LogIn size={18} />}
                {isLoggedIn ? "THANH TOÁN" : "ĐĂNG NHẬP ĐỂ THANH TOÁN"}
              </button>
              <button className={styles.view} onClick={() => { handleClose(); nav("/cart"); }}>
                Xem giỏ hàng
              </button>
            </div>
          </>
        )}
      </aside>
    </div>,
    document.body
  );
}
