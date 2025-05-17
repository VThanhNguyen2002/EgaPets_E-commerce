import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, X, LogIn, Package } from "lucide-react";
import { toast } from "react-toastify";

import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import PromoInput from "@/components/PromoInput";
import ProductCardMini from "@/components/ProductCardMini/ProductCardMini";

import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import useProducts from "@/hooks/useProducts";
import { usePageTitle } from "@/hooks/usePageTitle";
import { formatCurrency } from "@/utils/formatCurrency";

import styles from "./CartPage.module.css";

const PROMO = "EGA50";
const RATE = 0.5;

export default function CartPage() {
  const nav = useNavigate();
  const { setLoading } = useLoadingStore();

  const {
    cartItems,
    remove,
    updateQty,
    add,
    optimisticAdd,
    refresh,
  } = useCartStore();

  const { isLoggedIn } = useAuthStore();

  usePageTitle("Giỏ hàng của bạn - EGA Pets");

  useEffect(() => {
    (async () => {
      await refresh();
      setLoading(false);
    })();
  }, []);

  const hasCat = cartItems.some((i) => i.loai === "cat");
  const hasDog = cartItems.some((i) => i.loai === "dog");
  const { products } = useProducts(hasCat ? "cat" : hasDog ? "dog" : "");
  const suggest = useMemo(
    () =>
      products
        .filter((p) => !cartItems.find((c) => c.san_pham_id === p.id))
        .slice(0, 8),
    [products, cartItems]
  );

  const subTotal = cartItems.reduce((s, i) => s + i.gia, 0);
  const [promoApplied, setPromoApplied] = useState(false);
  const discount = promoApplied ? subTotal * RATE : 0;
  const grandTotal = subTotal - discount;

  useEffect(() => {
    if (cartItems.length < 2 && promoApplied) setPromoApplied(false);
  }, [cartItems, promoApplied]);

  const goCheckout = () => {
    if (!isLoggedIn) {
      toast.info("Hãy đăng nhập trước khi thanh toán");
      nav("/login");
    } else {
      nav("/checkout", { state: { total: grandTotal } });
    }
  };

  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={styles.breadcrumbsWrapper}>
          <Breadcrumbs />
        </div>
        
        <h1 className={styles.title}>Giỏ hàng</h1>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>Giỏ hàng của bạn đang trống!</p>
        ) : (
          <section className={styles.grid}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th colSpan={2}>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Tạm tính</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((it) => (
                  <tr key={it.id}>
                    <td>
                      <img src={it.thumb || "/src/assets/img-placeholder.png"} />
                    </td>
                    <td className={styles.pName}>
                      {it.ten_san_pham}
                      {it.ma_sp && <small>#{it.ma_sp}</small>}
                    </td>
                    <td>{formatCurrency(it.don_gia)}</td>
                    <td>
                      <div className={styles.qtyBoxModern}>
                        <button
                          disabled={it.so_luong <= 1}
                          onClick={() => updateQty(it.id, it.so_luong - 1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{it.so_luong}</span>
                        <button onClick={() => updateQty(it.id, it.so_luong + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className={styles.bold}>{formatCurrency(it.gia)}</td>
                    <td>
                      <button
                        className={styles.delStandalone}
                        title="Xoá"
                        onClick={() => remove(it.id)}
                      >
                        <X size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <aside className={styles.summary}>
              <PromoInput
                enabled={cartItems.length > 0}
                cartCount={cartItems.length}
                subTotal={subTotal}
                applied={promoApplied}
                onApply={() => setPromoApplied(true)}
              />
              <h3>Tổng cộng</h3>
              <p className={styles.money}>{formatCurrency(grandTotal)}</p>
              <button className={styles.btn} onClick={goCheckout}>
                {isLoggedIn ? <Package size={18} /> : <LogIn size={18} />}
                &nbsp;{isLoggedIn ? "THANH TOÁN" : "ĐĂNG NHẬP ĐỂ THANH TOÁN"}
              </button>
            </aside>
          </section>
        )}

        {suggest.length > 0 && (
          <section className={styles.suggest}>
            <h2>Sản phẩm gợi ý</h2>
            <div className={styles.gridSuggest}>
              {suggest.map((p) => (
                <ProductCardMini
                  key={p.id}
                  p={p}
                  onClick={() => nav(`/sanpham/${p.id}`)}
                  onAdd={async () => {
                    optimisticAdd(p);
                    await add({ productId: p.id, quantity: 1 });
                    refresh();
                  }}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}