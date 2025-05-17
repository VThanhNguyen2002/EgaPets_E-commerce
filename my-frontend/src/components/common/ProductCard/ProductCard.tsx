import { Eye, Scale, ShoppingCart } from "lucide-react";
import { Product } from "../../../types/Product";
import { useCartStore } from "../../../store/cartStore";
import { cartApi } from "../../../services/cartApi";
import styles from "./ProductCard.module.css";
import placeholder from "../placeholder/product.png";

interface Props {
  data: Product;
  onQuickView(): void;
  onCompare(): void;
}

const getThumb = (p: Product) => p.thumb || placeholder;
const getHover = (p: Product) => p.hover || null;

export default function ProductCard({ data, onQuickView, onCompare }: Props) {
  const { refresh } = useCartStore();
  const base = data.gia_thanh ?? 0;
  const sale = data.giam_gia ? Math.round(base * (1 - data.giam_gia / 100)) : base;
  const name = data.ten_san_pham;

  const thumbUrl = getThumb(data);
  const hoverUrl = getHover(data);
  const hasHover = Boolean(hoverUrl);

  const addToCart = async () => {
    try {
      await cartApi.add({ productId: data.id, quantity: 1 });
      await refresh();
    } catch (e) {
      alert((e as Error).message);
    }
  };

  return (
    <div className={styles.card}>
      {/* ẢNH */}
      <div className={`${styles.imgWrap} ${hasHover ? styles.hasHover : ""}`}>
        <img
          src={thumbUrl}
          alt={name}
          className={styles.img}
          onError={(e) => (e.currentTarget.src = placeholder)}
        />

        {hasHover && (
          <img
            src={hoverUrl}
            alt=""
            className={`${styles.img} ${styles.imgHover}`}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}

        <div className={styles.hoverIcons}>
          <button onClick={onQuickView}><Eye size={24} /></button>
          <button onClick={onCompare}><Scale size={24} /></button>
        </div>

        {data.giam_gia > 0 && <span className={styles.badge}>-{data.giam_gia}%</span>}
      </div>

      {/* TEXT */}
      <div className={styles.textZone}>
        <h3 className={styles.name} title={name}>{name}</h3>

        <div className={styles.bottomRow}>
          <span className={styles.price}>{sale.toLocaleString()}đ</span>
          {data.giam_gia > 0 && (
            <span className={styles.oldPrice}>{base.toLocaleString()}đ</span>
          )}
          <button className={styles.cartBtn} onClick={addToCart}>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
